import { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'
import { z } from 'zod'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  text: z.string().min(1),
  html: z.string().min(1),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { to, subject, text, html } = emailSchema.parse(req.body)

    const msg = {
      to,
      from: 'your-verified-sender@example.com', // Debe ser un remitente verificado en SendGrid
      subject,
      text,
      html,
    }

    await sgMail.send(msg)
    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      console.error(error)
      res.status(500).json({ error: 'Error sending email' })
    }
  }
}