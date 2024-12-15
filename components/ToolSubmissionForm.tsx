'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import confetti from 'canvas-confetti'

interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  favicon: string;
  dateAdded: string;
  lastUsed: string;
}

interface ToolSubmissionFormProps {
  onNewTool: (tool: Tool) => void
}

export default function ToolSubmissionForm({ onNewTool }: ToolSubmissionFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [customCategory, setCustomCategory] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    if (!urlPattern.test(url)) {
      alert('Please enter a valid URL')
      return
    }

    const faviconUrl = `https://www.google.com/s2/favicons?domain=${url}&sz=128`

    const newTool: Tool = {
      id: Date.now().toString(),
      name,
      url,
      description,
      category: category === 'custom' ? customCategory : category,
      favicon: faviconUrl,
      dateAdded: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
    }

    onNewTool(newTool)

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })

    setIsOpen(false)
    setName('')
    setUrl('')
    setDescription('')
    setCategory('')
    setCustomCategory('')
  }

  return (
    <div className="mb-6">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-full p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add New AI Tool
        </button>
      )}
      {isOpen && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Tool Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="url"
            placeholder="Tool URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Short Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 100))}
            maxLength={100}
            className="w-full p-2 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Code Generation">Code Generation</option>
            <option value="Code Analysis">Code Analysis</option>
            <option value="Testing">Testing</option>
            <option value="DevOps">DevOps</option>
            <option value="Documentation">Documentation</option>
            <option value="custom">Add Custom Category</option>
          </select>
          {category === 'custom' && (
            <input
              type="text"
              placeholder="Enter custom category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="w-full p-2 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded bg-gray-200 text-gray-800 mr-2 hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

