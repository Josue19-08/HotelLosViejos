// Este componente ya no se usa en la página Sobre Nosotros
interface AboutMissionVisionProps {
  mission: string
  vision: string
}

export function AboutMissionVision({ mission, vision }: AboutMissionVisionProps) {
  return (
    <section className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-playfair font-bold text-teal-700 mb-4">Nuestra Misión</h2>
      <p className="text-gray-700 mb-6">{mission}</p>

      <h2 className="text-2xl font-playfair font-bold text-teal-700 mb-4">Nuestra Visión</h2>
      <p className="text-gray-700">{vision}</p>
    </section>
  )
}

