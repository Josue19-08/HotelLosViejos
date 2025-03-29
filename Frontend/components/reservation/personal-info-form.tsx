"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertMessage } from "../alert"
import { useState } from "react"
import { se } from 'date-fns/locale';

interface PersonalInfoFormProps {
  firstName: string
  setFirstName: (value: string) => void
  lastName: string
  setLastName: (value: string) => void
  email: string
  setEmail: (value: string) => void
  creditCard: string
  formattedCreditCard: string
  handleCreditCardChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onBack: () => void
  isSubmitting: boolean
}

export function PersonalInfoForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  formattedCreditCard,
  handleCreditCardChange,
  onSubmit,
  onBack,
  isSubmitting,
}: PersonalInfoFormProps) {

  const [alert, setAlert] = useState<{
    type: "success" | "error" | "info"
    title: string
    message: string
  } | null>(null)

  const validateForm = () => {
    // Validaciones
    if (!firstName || !lastName || !email || !formattedCreditCard) {
      setAlert({
        type: "error",
        title: "Campos incompletos",
        message: "Por favor, complete todos los campos.",
      })
      return false
    }
    // Validar el email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setAlert({
        type: "error",
        title: "Email inválido",
        message: "Por favor, ingrese un email válido.",
      })
      return false
    }

    // Validar tarjeta de crédito (mínimo 13 caracteres, máximo 16)
    if (formattedCreditCard.replace(/\s+/g, "").length < 13 || formattedCreditCard.replace(/\s+/g, "").length > 16) {
      setAlert({
        type: "error",
        title: "Tarjeta de crédito inválida",
        message: "Por favor, ingrese una tarjeta de crédito válida (debe tener entre 13 y 16 dígitos).",
      })
      return false
    }

    setAlert(null)
    return true
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(e)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {alert && <AlertMessage type={alert.type} title={alert.title} message={alert.message} />}
      <div className="space-y-2">
        <label htmlFor="first-name" className="block text-gray-700">
          Nombre:
        </label>
        <Input
          id="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          
          className="border-gray-200 bg-white"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="last-name" className="block text-gray-700">
          Apellidos:
        </label>
        <Input
          id="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          
          className="border-gray-200 bg-white"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-gray-700">
          Email:
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
          className="border-gray-200 bg-white"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="credit-card" className="block text-gray-700">
          Tarjeta de Crédito:
        </label>
        <Input
          id="credit-card"
          value={formattedCreditCard}
          onChange={handleCreditCardChange}
          placeholder="XXXX XXXX XXXX XXXX"
          maxLength={19} // 16 dígitos + 3 espacios
          
          className="border-gray-200 bg-white"
        />
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack} className="border-gray-200">
          Cancelar
        </Button>

        <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Procesando...
            </>
          ) : (
            "Aceptar"
          )}
        </Button>
      </div>
    </form>
  )
}
