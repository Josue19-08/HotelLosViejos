interface PagePreviewProps {
    title: string
    content: string
    imageUrl: string
  }
  
  export function PagePreview({ title, content, imageUrl }: PagePreviewProps) {
    return (
      <div className="bg-white border rounded-md p-4">
        <h1 className="text-2xl font-playfair font-bold text-amber-800 mb-4">{title || "Título de la página"}</h1>
  
        {imageUrl && (
          <div className="mb-4">
            <img src={imageUrl || "/placeholder.svg"} alt={title} className="max-w-full rounded-md" />
          </div>
        )}
  
        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{
            __html: content || "<p>Contenido principal de la página...</p>",
          }}
        />
      </div>
    )
  }
  
  