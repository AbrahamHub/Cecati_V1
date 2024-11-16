"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Suscribiendo email:', email)
    toast({
      title: "¡Suscrito!",
      description: "Te has suscrito exitosamente a nuestro boletín.",
    })
    setEmail('')
  }

  return (
    <section className="bg-secondary py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Suscríbete a Nuestro Boletín</h2>
        <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Input
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-black w-full md:w-auto md:flex-grow"
          />
          <Button type="submit" className="w-full md:w-auto">Suscribir</Button>
        </form>
      </div>
    </section>
  )
}

export default NewsletterSubscription