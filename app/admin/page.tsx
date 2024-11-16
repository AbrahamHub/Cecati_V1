"use client"

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Schemas
const loginSchema = z.object({
  email: z.string().email({
    message: "Por favor, ingresa una dirección de correo electrónico válida.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
})

const userSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Ingresa un correo electrónico válido." }),
  role: z.enum(["editor", "admin"], { 
    required_error: "Por favor selecciona un rol.",
  }),
})

const newsSchema = z.object({
  title: z.string().min(5, { message: "El título debe tener al menos 5 caracteres." }),
  content: z.string().min(20, { message: "El contenido debe tener al menos 20 caracteres." }),
  image: z.string().url({ message: "Por favor, ingresa una URL válida para la imagen." }).optional(),
})

const carouselImageSchema = z.object({
  url: z.string().url({ message: "Por favor, ingresa una URL válida para la imagen." }),
  alt: z.string().min(2, { message: "La descripción debe tener al menos 2 caracteres." }),
})

// Mock data
const mockUsers = [
  { id: 1, name: "Admin", email: "admin@admin.com", role: "admin" },
  { id: 2, name: "Editor 1", email: "editor1@cecati.com", role: "editor" },
]

const mockNews = [
  { id: 1, title: "Nueva capacitación disponible", content: "Cecati anuncia una nueva capacitación en programación web...", image: "https://example.com/image1.jpg" },
  { id: 2, title: "Resultados de la feria de ciencias", content: "Los estudiantes de Cecati brillaron en la feria de ciencias anual...", image: "https://example.com/image2.jpg" },
]

const mockCarouselImages = [
  { id: 1, url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80", alt: "Evento de Cecati 1" },
  { id: 2, url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80", alt: "Evento de Cecati 2" },
  { id: 3, url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80", alt: "Evento de Cecati 3" },
]

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [users, setUsers] = useState(mockUsers)
  const [news, setNews] = useState(mockNews)
  const [carouselImages, setCarouselImages] = useState(mockCarouselImages)
  const { toast } = useToast()

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const userForm = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "editor",
    },
  })

  const newsForm = useForm<z.infer<typeof newsSchema>>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  })

  const carouselImageForm = useForm<z.infer<typeof carouselImageSchema>>({
    resolver: zodResolver(carouselImageSchema),
    defaultValues: {
      url: "",
      alt: "",
    },
  })

  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    if (values.email === "admin@admin.com" && values.password === "Hola123") {
      setIsLoggedIn(true)
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al panel de administración.",
      })
    } else {
      toast({
        title: "Error de inicio de sesión",
        description: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    }
  }

  function onUserSubmit(values: z.infer<typeof userSchema>) {
    setUsers([...users, { id: users.length + 1, ...values }])
    toast({
      title: "Usuario creado",
      description: `Se ha creado el usuario ${values.name} con el rol de ${values.role}.`,
    })
    userForm.reset()
  }

  function onNewsSubmit(values: z.infer<typeof newsSchema>) {
    setNews([...news, { id: news.length + 1, ...values }])
    toast({
      title: "Noticia creada",
      description: "La noticia ha sido creada y publicada exitosamente.",
    })
    newsForm.reset()
  }

  function onCarouselImageSubmit(values: z.infer<typeof carouselImageSchema>) {
    setCarouselImages([...carouselImages, { id: carouselImages.length + 1, ...values }])
    toast({
      title: "Imagen agregada",
      description: "La imagen ha sido agregada al carrusel exitosamente.",
    })
    carouselImageForm.reset()
  }

  function deleteUser(id: number) {
    setUsers(users.filter(user => user.id !== id))
    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado exitosamente.",
    })
  }

  function deleteNews(id: number) {
    setNews(news.filter(item => item.id !== id))
    toast({
      title: "Noticia eliminada",
      description: "La noticia ha sido eliminada exitosamente.",
    })
  }

  function deleteCarouselImage(id: number) {
    setCarouselImages(carouselImages.filter(image => image.id !== id))
    toast({
      title: "Imagen eliminada",
      description: "La imagen ha sido eliminada del carrusel exitosamente.",
    })
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-8">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@admin.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Contraseña" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Iniciar Sesión</Button>
          </form>
        </Form>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Panel de Administración</h1>
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="news">Noticias</TabsTrigger>
          <TabsTrigger value="carousel">Carrusel</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
            <Form {...userForm}>
              <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-4">
                <FormField
                  control={userForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre del usuario" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder="correo@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full p-2 border rounded">
                          <option value="editor">Editor</option>
                          <option value="admin">Administrador</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Crear Usuario</Button>
              </form>
            </Form>
            <div>
              <h3 className="text-lg font-semibold mb-2">Usuarios Existentes</h3>
              <ul className="space-y-2">
                {users.map(user => (
                  <li key={user.id} className="flex justify-between items-center bg-secondary p-2 rounded">
                    <span>{user.name} ({user.email}) - {user.role}</span>
                    <Button variant="destructive" onClick={() => deleteUser(user.id)}>Eliminar</Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="news">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Gestión de Noticias</h2>
            <Tabs defaultValue="create">
              <TabsList>
                <TabsTrigger value="create">Crear Noticia</TabsTrigger>
                <TabsTrigger value="manage">Gestionar Noticias</TabsTrigger>
              </TabsList>
              <TabsContent value="create">
                <Form {...newsForm}>
                  <form onSubmit={newsForm.handleSubmit(onNewsSubmit)} className="space-y-4">
                    <FormField
                      control={newsForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título</FormLabel>
                          <FormControl>
                            <Input placeholder="Título de la noticia" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={newsForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contenido</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Contenido de la noticia" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={newsForm.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL de la Imagen</FormLabel>
                          <FormControl>
                            <Input placeholder="https://ejemplo.com/imagen.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Crear Noticia</Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="manage">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Noticias Existentes</h3>
                  <ul className="space-y-2">
                    {news.map(item => (
                      <li key={item.id} className="bg-secondary p-2 rounded">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.content.substring(0, 100)}...</p>
                        {item.image && <img src={item.image} alt={item.title} className="mt-2 w-full h-32 object-cover rounded" />}
                        <Button variant="destructive" onClick={() => deleteNews(item.id)} className="mt-2">Eliminar</Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
        <TabsContent value="carousel">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Gestión del Carrusel</h2>
            <Form {...carouselImageForm}>
              <form onSubmit={carouselImageForm.handleSubmit(onCarouselImageSubmit)} className="space-y-4">
                <FormField
                  control={carouselImageForm.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de la Imagen</FormLabel>
                      <FormControl>
                        <Input placeholder="https://ejemplo.com/imagen.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={carouselImageForm.control}
                  name="alt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción de la Imagen</FormLabel>
                      <FormControl>
                        <Input placeholder="Descripción de la imagen" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Agregar Imagen al Carrusel</Button>
              </form>
            </Form>
            <div>
              <h3 className="text-lg font-semibold mb-2">Imágenes del Carrusel</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {carouselImages.map(image => (
                  <Card key={image.id}>
                    <CardHeader>
                      <CardTitle>{image.alt}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img src={image.url} alt={image.alt} className="w-full h-32 object-cover rounded" />
                    </CardContent>
                    <CardFooter>
                      <Button variant="destructive" onClick={() => deleteCarouselImage(image.id)}>Eliminar</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <Button onClick={() => setIsLoggedIn(false)}>Cerrar Sesión</Button>
    </div>
  )
}