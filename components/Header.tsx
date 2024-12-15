'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    // TODO: Implement real-time search functionality
  }

  return (
    <header className="mb-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">AI Tools Management</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 pl-10 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
    </header>
  )
}

