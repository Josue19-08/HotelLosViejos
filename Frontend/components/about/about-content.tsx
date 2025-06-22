interface AboutContentProps {
  content: string
}

export function AboutContent({ content }: AboutContentProps) {


  return (
    <section>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 mb-8">
        <p>{content}</p>
      </div>
    </section>
  )
}

