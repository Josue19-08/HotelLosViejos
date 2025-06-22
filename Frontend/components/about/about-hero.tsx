interface AboutHeroProps {
  title: string
}

export function AboutHero({ title }: AboutHeroProps) {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-playfair font-bold text-teal-700 mb-6">{title}</h1>
    </section>
  )
}

