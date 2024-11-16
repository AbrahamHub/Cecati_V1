import Image from 'next/image'

export default function About() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Acerca de Cecati</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Image 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80" 
            alt="Edificio de Cecati" 
            width={800} 
            height={600} 
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold">Nuestra Misión</h2>
          <p>
            En Cecati, estamos dedicados a fomentar el amor por el aprendizaje, la creatividad y el crecimiento personal. 
            Nuestra misión es proporcionar un ambiente enriquecedor donde los estudiantes puedan desarrollar todo su potencial 
            y convertirse en miembros responsables, compasivos y exitosos de la sociedad.
          </p>
          <h2 className="text-2xl font-semibold">Nuestros Valores</h2>
          <ul className="list-disc list-inside">
            <li>Excelencia en la educación</li>
            <li>Respeto por la diversidad</li>
            <li>Compromiso con la comunidad</li>
            <li>Innovación y creatividad</li>
            <li>Aprendizaje continuo</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Nuestra Historia</h2>
        <p>
          Fundado en 1950, Cecati tiene una rica historia de excelencia académica y participación comunitaria. 
          A lo largo de los años, hemos crecido de una pequeña escuela local a una institución reconocida, 
          produciendo constantemente graduados que hacen contribuciones significativas en diversos campos.
        </p>
        <p>
          Hoy, continuamos construyendo sobre este legado, adoptando técnicas y tecnologías educativas modernas 
          mientras permanecemos fieles a nuestros valores fundamentales y nuestro compromiso con la educación integral.
        </p>
      </div>
    </div>
  )
}