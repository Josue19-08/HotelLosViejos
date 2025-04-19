"use client"

import { useState, useRef } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Seleccionar características...",
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  // Manejar selección/deselección de una opción
  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value))
    } else {
      onChange([...selected, value])
    }
  }

  // Remover una opción seleccionada
  const handleRemove = (value: string) => {
    onChange(selected.filter((item) => item !== value))
  }

  // Limpiar todas las selecciones
  const handleClear = () => {
    onChange([])
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-10 py-2"
          >
            <div className="flex flex-wrap gap-1">
              {selected.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
              {selected.map((value) => {
                const option = options.find((opt) => opt.value === value)
                return option ? (
                  <Badge key={value} variant="secondary" className="mr-1 mb-1">
                    {option.label}
                    <span
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRemove(value)
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onClick={() => handleRemove(value)}
                      role="button" // Make it clear this is an interactive element
                      aria-label="Remove item" // Optional: Add an aria-label for better accessibility
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </span>
                  </Badge>

                ) : null
              })}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start" style={{ width: ref.current?.offsetWidth }}>
          <Command>
            <CommandInput placeholder="Buscar característica..." />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <div className="max-h-60 overflow-auto">
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem key={option.value} value={option.value} onSelect={() => handleSelect(option.value)}>
                      <Check
                        className={cn("mr-2 h-4 w-4", selected.includes(option.value) ? "opacity-100" : "opacity-0")}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            </CommandList>
            {selected.length > 0 && (
              <div className="border-t p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-muted-foreground"
                  onClick={() => {
                    handleClear()
                    setOpen(false)
                  }}
                >
                  Limpiar selección
                </Button>
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

