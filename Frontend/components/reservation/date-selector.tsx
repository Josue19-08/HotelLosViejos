"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface DateSelectorProps {
  label: string
  selectedDate: Date | undefined
  onDateChange: (date: Date | undefined) => void
  minDate?: Date
  id: string
}

export function DateSelector({ label, selectedDate, onDateChange, minDate, id }: DateSelectorProps) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-gray-700 mb-2">
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal border-gray-200 bg-white hover:bg-gray-50"
            id={id}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-teal-600" />
            {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-gray-200">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            locale={es}
            initialFocus
            disabled={(date) => date < (minDate || new Date())}
            className="rounded-md"
            styles={{
              head_cell: { color: "var(--teal-600)" },
              day_selected: { backgroundColor: "var(--teal-100)", color: "var(--teal-700)" },
              day_today: { color: "var(--teal-600)" },
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

