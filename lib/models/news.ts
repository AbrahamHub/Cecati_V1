import { z } from 'zod';

export const NewsSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  content: z.string().min(20, "El contenido debe tener al menos 20 caracteres"),
  excerpt: z.string().min(10, "El resumen debe tener al menos 10 caracteres"),
  image: z.string().url("La URL de la imagen no es válida"),
  author: z.string().min(2, "El autor debe tener al menos 2 caracteres"),
  date: z.string().datetime("La fecha debe estar en formato ISO"),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]).default("published"),
  slug: z.string().min(5, "El slug debe tener al menos 5 caracteres"),
});

export type News = z.infer<typeof NewsSchema>;