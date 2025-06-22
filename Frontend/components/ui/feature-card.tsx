export function FeatureCard({ title, description, icon }) {
  const getIcon = () => {
    switch (icon) {
      case "luxury":
        return (
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12h20M2 12v8a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-8M2 12l2-6h16l2 6M12 3v5M5 3v5M19 3v5" />
            </svg>
          </div>
        )
      case "food":
        return (
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 10h10M7 14h10" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
        )
      case "water":
        return (
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12h20M12 2v20M20 16l-4-4 4-4M4 8l4 4-4 4" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="p-6">
        {getIcon()}
        <h3 className="font-playfair font-bold text-teal-700 mb-2 text-xl group-hover:text-teal-500 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="h-1.5 w-full bg-gradient-to-r from-teal-400 to-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  )
}

