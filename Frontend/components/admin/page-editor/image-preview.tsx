import { ImageIcon } from "lucide-react"

interface ImagePreviewProps {
  url: string
  alt: string
  height?: string
  size?: number
  emptyLabel?: string
}

export function ImagePreview({
  url,
  alt,
  height = "h-[200px]",
  size = 48,
  emptyLabel = "No hay imagen",
}: ImagePreviewProps) {
  return (
    <div className={`border rounded-md overflow-hidden bg-gray-50 flex items-center justify-center ${height}`}>
      {url ? (
        <img src={url} alt={alt} className="max-w-full max-h-full object-contain" />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <ImageIcon size={size} strokeWidth={1} />
          {emptyLabel && <span className="text-sm mt-2">{emptyLabel}</span>}
        </div>
      )}
    </div>
  )
}
