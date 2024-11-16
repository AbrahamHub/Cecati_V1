import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongodb'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { z } from 'zod'

const newsSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  content: z.string().min(20, "El contenido debe tener al menos 20 caracteres"),
  image: z.string().url().optional(),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ error: "No autorizado" })
  }

  const {
    query: { id },
    method,
  } = req

  const client = await clientPromise
  const db = client.db("cecati_blog")

  switch (method) {
    case 'GET':
      try {
        const news = await db.collection("news").findOne({ _id: new ObjectId(id as string) })
        if (!news) {
          return res.status(404).json({ error: "Noticia no encontrada" })
        }
        res.status(200).json(news)
      } catch (error) {
        res.status(400).json({ error: "ID inválido" })
      }
      break

    case 'PUT':
      try {
        const validatedData = newsSchema.parse(req.body)
        const result = await db.collection("news").updateOne(
          { _id: new ObjectId(id as string) },
          { $set: validatedData }
        )
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Noticia no encontrada" })
        }
        res.status(200).json({ id, ...validatedData })
      } catch (error) {
        if (error instanceof z.ZodError) {
          res.status(400).json({ error: error.errors })
        } else {
          res.status(400).json({ error: "ID inválido o datos incorrectos" })
        }
      }
      break

    case 'DELETE':
      try {
        const result = await db.collection("news").deleteOne({ _id: new ObjectId(id as string) })
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Noticia no encontrada" })
        }
        res.status(200).json({ message: "Noticia eliminada correctamente" })
      } catch (error) {
        res.status(400).json({ error: "ID inválido" })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}