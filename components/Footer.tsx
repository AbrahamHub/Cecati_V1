const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Acerca de Nosotros</h3>
            <p>CECATI está dedicado a compartir noticias, eventos e historias de nuestra vibrante comunidad educativa.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/">Inicio</a></li>
              <li><a href="/about">Acerca de</a></li>
              <li><a href="/contact">Contacto</a></li>
              <li><a href="/privacy-policy">Política de Privacidad</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Conéctate con Nosotros</h3>
            <ul className="space-y-2">
              <li>Email: info@cecati.edu.mx</li>
              <li>Teléfono: (123) 456-7890</li>
              <li>Dirección: Calle CECATI 123, Ciudad, Estado 12345</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center">
          <p>&copy; 2023 CECATI. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer