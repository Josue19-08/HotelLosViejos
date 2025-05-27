import { useState } from "react"

export function usePersonalInfoForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [creditCard, setCreditCard] = useState("")

  const [alert, setAlert] = useState<{
    type: "success" | "error" | "info"
    title: string
    message: string
  } | null>(null)

  const validateAndSubmit = (
    callback: (data: {
      firstName: string
      lastName: string
      email: string
      creditCard: string
    }) => void
  ) => {
    if (!firstName || !lastName || !email || !creditCard) {
      setAlert({
        type: "error",
        title: "Campos incompletos",
        message: "Por favor, complete todos los campos.",
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setAlert({
        type: "error",
        title: "Email inválido",
        message: "Por favor, ingrese un email válido.",
      })
      return false
    }

    const digits = creditCard.replace(/\s+/g, "")
    if (digits.length < 13 || digits.length > 16) {
      setAlert({
        type: "error",
        title: "Tarjeta de crédito inválida",
        message: "Debe tener entre 13 y 16 dígitos.",
      })
      return false
    }

    setAlert(null)

    callback({
      firstName,
      lastName,
      email,
      creditCard,
    })

    return true
  }

  const handleCreditCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16)
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ")
    setCreditCard(formatted)
  }

  return {
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
  }
}
