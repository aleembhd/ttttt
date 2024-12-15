'use client'

import { useState } from 'react'

interface Tool {
  id: string
  name: string
  url: string
  description: string
  category: string
  favicon: string
  dateAdded: string
  lastUsed: string
}

interface EditToolFormProps {
  tool: Tool
  onSubmit: (editedTool: Tool) => void
  onCancel: () => void
  categories: string[]
}

export default function EditToolForm({ tool, onSubmit, onCancel, categories }: EditToolFormProps) {
  const [name, setName] = useState(tool.name)
  const [url, setUrl] = useState(tool.url)
  const [description, setDescription] = useState(tool.description)
  const [category, setCategory] = useState(tool.category)
  const [customCategory, setCustomCategory] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    if (!urlPattern.test(url)) {
      alert('Please enter a valid URL')
      return
    }

    const editedTool: Tool = {
      ...tool,
      name,
      url,
      description,
      category: category === 'custom' ? customCategory : category,
    }

    onSubmit(editedTool)
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit AI Tool</h2>
        <form onSubmit={handleSubmit}>
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
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
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
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-200 text-gray-800 mr-2 hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

