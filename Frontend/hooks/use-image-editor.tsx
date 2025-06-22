import { useState, useEffect } from "react"

export function useImageEditor(currentImageUrl: string, onImageChange: (url: string) => void) {
  const [newImageUrl, setNewImageUrl] = useState("")
  const [previewImageUrl, setPreviewImageUrl] = useState("")

  useEffect(() => {
    setPreviewImageUrl(currentImageUrl)
  }, [currentImageUrl])

  const handleImageUrlChange = (value: string) => setNewImageUrl(value)

  const handlePreviewImage = () => {
    if (newImageUrl) setPreviewImageUrl(newImageUrl)
  }

  const handleApplyImage = () => {
    if (newImageUrl) {
      onImageChange(newImageUrl)
      setNewImageUrl("")
    }
  }

  const handleCancelImage = () => {
    setNewImageUrl("")
    setPreviewImageUrl(currentImageUrl)
  }

  return {
    newImageUrl,
    previewImageUrl,
    handleImageUrlChange,
    handlePreviewImage,
    handleApplyImage,
    handleCancelImage,
  }
}
