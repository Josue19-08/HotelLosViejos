"use client"

import type React from "react"

import { useState } from "react"
import { Edit, ImageIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ContentEditorProps {
  content: string
  onChange: (content: string) => void
}

export function ContentEditor({ content, onChange }: ContentEditorProps) {
  const [activeTab, setActiveTab] = useState("editor")

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Contenido principal</label>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor" className="flex items-center gap-2">
            <Edit size={16} />
            Editor
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <ImageIcon size={16} />
            Vista previa
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="border rounded-md p-1">
          <textarea
            className="w-full p-3 min-h-[200px] focus:outline-none border rounded-md"
            value={content.replace(/<[^>]*>/g, "")}
            onChange={handleEditorChange}
          />
        </TabsContent>

        <TabsContent value="preview" className="border rounded-md p-4">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

