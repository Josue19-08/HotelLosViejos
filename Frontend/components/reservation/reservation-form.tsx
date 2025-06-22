"use client"

import { useReservation } from "@/hooks/use-reservation"
import { ConfirmationMessage } from "./confirmation-message"
import { Step1 } from "./step-1"
import { Step2 } from "./step-2"
import { useHabitacion } from "@/hooks/use-habitacion"

export function ReservationForm() {
  const {
    checkInDate, setCheckInDate,
    checkOutDate, setCheckOutDate,
    roomType, setRoomType,
    firstName, setFirstName,
    lastName, setLastName,
    email, setEmail,
    creditCard, formattedCreditCard,
    handleCreditCardChange,
    nights,
    totalPrice,
    alert,
    setAlert,
    selectedRoom,
    step,
    setStep,
    appliedOffer,
    handleFirstStep,
    handleSecondStep,
    isSubmitting,
    formSubmitted,
    reservationId,
  } = useReservation()

  const { habitaciones } = useHabitacion()

  if (formSubmitted && reservationId) {
    return (
      <div className="w-full flex justify-center px-4 overflow-visible">
        <ConfirmationMessage idReserva={reservationId} />
      </div>
    )

  }

  return (
    <>
      {step === 1 && (
        <Step1
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          roomType={roomType}
          habitaciones={habitaciones}
          selectedRoom={selectedRoom}
          nights={nights}
          totalPrice={totalPrice}
          appliedOffer={appliedOffer}
          onCheckInChange={setCheckInDate}
          onCheckOutChange={setCheckOutDate}
          onRoomTypeChange={setRoomType}
          onSubmit={handleFirstStep}
          alert={alert}
        />
      )}

      {step === 2 && (
        <Step2
          selectedRoom={selectedRoom}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          nights={nights}
          totalPrice={totalPrice}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          creditCard={creditCard}
          formattedCreditCard={formattedCreditCard}
          handleCreditCardChange={handleCreditCardChange}
          isSubmitting={isSubmitting}
          onBack={() => setStep(1)}
          onSubmit={handleSecondStep}
          alert={alert}
          setAlert={setAlert}
        />
      )}
    </>
  )
}
