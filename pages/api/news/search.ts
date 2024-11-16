import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import type { SearchResponse } from '@/lib/types/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { q = '' } = req.query;
    
    if (typeof q !== 'string') {
      return res.status(400).json({ error: 'Invalid search query' });
    }

    if (q.length < 2) {
      return res.status(200).json({ data: [] });
    }

    const client = await clientPromise;
    const db = client.db("cecati_blog");

    // Ensure search indexes exist
    await db.collection("news").createIndex({
      title: "text",
      content: "text",
      tags: "text",
      excerpt: "text"
    });

    const searchQuery = {
      $and: [
        {
          $or: [
            { title: { $regex: q, $options: 'i' } },
            { content: { $regex: q, $options: 'i' } },
            { tags: { $regex: q, $options: 'i' } },
            { excerpt: { $regex: q, $options: 'i' } }
          ]
        },
        { status: 'published' }
      ]
    };

    const news = await db.collection("news")
      .find(searchQuery)
      .project({
        title: 1,
        excerpt: 1,
        slug: 1,
        image: 1,
        date: 1
      })
      .sort({ date: -1 })
      .limit(10)
      .toArray();

    res.status(200).json({ data: news });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'Error al buscar noticias',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}