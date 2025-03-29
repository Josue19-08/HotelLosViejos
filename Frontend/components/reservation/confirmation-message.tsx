"use client"

interface ConfirmationMessageProps {
  firstName: string
  reservationNumber: string
  email: string
}

export function ConfirmationMessage({ firstName, reservationNumber, email }: ConfirmationMessageProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-teal-700 mb-6">Reservacion realizada!</h2>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 space-y-6">
        <p className="text-xl font-medium">
          Gracias <strong>{firstName}</strong>!! Su reservacion fue realizada exitosamente.
        </p>

        <p className="font-medium">
          Numero de reservacion: <span className="font-mono">{reservationNumber}</span>
        </p>

        <p>
          Acabamos de enviar esta informacion a la direccion <strong>{email}</strong> para mayor facilidad.
        </p>

        <div className="pt-8">
          <p className="font-medium">Gracias por preferirnos!</p>
        </div>
      </div>
    </div>
  )
}

