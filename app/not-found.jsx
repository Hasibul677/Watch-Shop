import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative">
          <h1 className="text-9xl font-black text-gray-200 select-none">404</h1>
          <h2 className="text-3xl font-bold text-indigo-600 absolute inset-0 flex items-center justify-center">
            Page Not Found
          </h2>
        </div>

        <p className="text-lg text-gray-600">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:scale-105"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-static'