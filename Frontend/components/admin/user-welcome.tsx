import Link from "next/link"

interface UserWelcomeProps {
  username: string
}

export function UserWelcome({ username }: UserWelcomeProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-200 border border-gray-300 rounded-sm flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-600"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-700">Bienvenido {username}</span>
        <Link href="/admin" className="text-blue-600 hover:underline">
          Salir
        </Link>
      </div>
    </div>
  )
}

