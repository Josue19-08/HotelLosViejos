"use client"

import { RoomDetail } from "./room-detail"
import { PersonalInfoForm } from "./personal-info-form"
import { ArrowLeft } from "lucide-react"
import { AlertMessage } from "../alert"
import type { HabitacionBase } from "@/types/Habitacion"

interface Step2Props {
  selectedRoom: HabitacionBase | null
  checkInDate?: Date
  checkOutDate?: Date
  nights: number
  totalPrice: number
  firstName: string
  setFirstName: (val: string) => void
  lastName: string
  setLastName: (val: string) => void
  email: string
  setEmail: (val: string) => void
  creditCard: string
  formattedCreditCard: string
  handleCreditCardChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isSubmitting: boolean
  onBack: () => void
  onSubmit: (data: {
    firstName: string
    lastName: string
    email: string
    creditCard: string
  }) => void
  alert: { type: string; title: string; message: string } | null // 👈 agregado
  setAlert: (a: { type: string; title: string; message: string } | null) => void // 👈 agregado
}

export function Step2({
  selectedRoom,
  checkInDate,
  checkOutDate,
  nights,
  totalPrice,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  creditCard,
  formattedCreditCard,
  handleCreditCardChange,
  isSubmitting,
  onBack,
  onSubmit,
  alert,
  setAlert
}: Step2Props) {
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center text-teal-600 hover:text-teal-700 mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Volver
      </button>

      {alert && (
        <AlertMessage
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {selectedRoom && (
          <RoomDetail
            selectedRoom={selectedRoom}
            totalPrice={totalPrice}
            nights={nights}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
          />
        )}

        <div className="bg-white rounded-lg shadow-sm p-6">
          <PersonalInfoForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            creditCard={creditCard}
            formattedCreditCard={formattedCreditCard}
            handleCreditCardChange={handleCreditCardChange}
            onSubmit={onSubmit}
            onBack={onBack}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  )
}
