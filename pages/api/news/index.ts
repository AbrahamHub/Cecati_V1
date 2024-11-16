import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NewsSchema } from '@/lib/models/news';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const client = await clientPromise;
  const db = client.db("cecati_blog");

  switch (req.method) {
    case 'GET':
      try {
        const { page = '1', limit = '10', tag } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        
        const query = tag ? { tags: tag, status: 'published' } : { status: 'published' };
        
        const [news, total] = await Promise.all([
          db.collection("news")
            .find(query)
            .sort({ date: -1 })
            .skip(skip)
            .limit(parseInt(limit as string))
            .toArray(),
          db.collection("news").countDocuments(query)
        ]);

        res.status(200).json({
          news,
          pagination: {
            total,
            pages: Math.ceil(total / parseInt(limit as string)),
            currentPage: parseInt(page as string),
            perPage: parseInt(limit as string)
          }
        });
      } catch (error) {
        console.error('GET error:', error);
        res.status(500).json({ error: 'Error al obtener noticias' });
      }
      break;

    case 'POST':
      if (!session) {
        return res.status(401).json({ error: "No autorizado" });
      }

      try {
        const validatedData = NewsSchema.parse({
          ...req.body,
          date: new Date().toISOString(),
          slug: req.body.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        });

        const result = await db.collection("news").insertOne(validatedData);
        res.status(201).json({ id: result.insertedId, ...validatedData });
      } catch (error) {
        console.error('POST error:', error);
        res.status(400).json({ error: 'Error al crear la noticia' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}