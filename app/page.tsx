import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import NewsletterSubscription from '@/components/NewsletterSubscription'

const recentPosts = [
  { id: 1, title: "Ganadores de la Feria de Ciencias Anual Anunciados", excerpt: "Felicitaciones a todos los participantes en la Feria de Ciencias de este año...", image: "https://images.unsplash.com/photo-1564979268369-42032c5ca998?w=500&q=80" },
  { id: 2, title: "Nueva Exposición de Arte Abre en la Galería de la Escuela", excerpt: "Nuestros talentosos estudiantes muestran su creatividad en la última exposición de arte...", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&q=80" },
  { id: 3, title: "Día Deportivo: Récords Rotos", excerpt: "El Día Deportivo de este año fue un evento emocionante con varios récords escolares batidos...", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80" },
]

const carouselImages = [
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80",
]

export default function Home() {
  return (
    <div className="space-y-8">
      <section>
        <Carousel>
          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[400px]">
                  <Image src={image} alt={`Evento de Cecati ${index + 1}`} fill style={{objectFit: "cover"}} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Noticias Recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map(post => (
            <Card key={post.id}>
              <CardHeader>
                <Image src={post.image} alt={post.title} width={500} height={300} className="rounded-t-lg" />
              </CardHeader>
              <CardContent>
                <CardTitle>{post.title}</CardTitle>
                <p className="mt-2">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/blog/${post.id}`}>Leer Más</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <NewsletterSubscription />
    </div>
  )
}