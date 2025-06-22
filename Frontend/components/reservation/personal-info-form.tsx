"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertMessage } from "../alert"
import { usePersonalInfoForm } from "@/hooks/use-personal-info-form"

interface Props {
  onSubmit: (data: {
    firstName: string
    lastName: string
    email: string
    creditCard: string
  }) => void
  onBack: () => void
  isSubmitting: boolean
}

export function PersonalInfoForm({ onSubmit, onBack, isSubmitting }: Props) {
  const {
    firstName,
    lastName,
    email,
    creditCard,
    setFirstName,
    setLastName,
    setEmail,
    handleCreditCardChange,
    alert,
    validateAndSubmit,
  } = usePersonalInfoForm()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isValid = validateAndSubmit((data) => onSubmit(data))
    if (!isValid) return
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {alert && <AlertMessage type={alert.type} title={alert.title} message={alert.message} />}

      <div className="space-y-2">
        <label htmlFor="first-name" className="block text-gray-700">Nombre:</label>
        <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>

      <div className="space-y-2">
        <label htmlFor="last-name" className="block text-gray-700">Apellidos:</label>
        <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-gray-700">Email:</label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="space-y-2">
        <label htmlFor="credit-card" className="block text-gray-700">Tarjeta de Crédito:</label>
        <Input
          id="credit-card"
          value={creditCard}
          onChange={handleCreditCardChange}
          placeholder="XXXX XXXX XXXX XXXX"
          maxLength={19}
        />
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>Cancelar</Button>
        <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
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
