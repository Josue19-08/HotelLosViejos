interface AboutContentProps {
  content: string[]
}

export function AboutContent({ content }: AboutContentProps) {
  return (
    <section>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 mb-8">
        {content.map((paragraph, index) => (
          <p key={index} className="text-gray-700 mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}

