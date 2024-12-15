'use client'

import { useState, useEffect } from 'react'
import ToolCard from './ToolCard'
import EditToolForm from './EditToolForm'

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

interface ToolGridProps {
  tools: Tool[]
  setTools: React.Dispatch<React.SetStateAction<Tool[]>>
}

export default function ToolGrid({ tools, setTools }: ToolGridProps) {
  const [filteredTools, setFilteredTools] = useState<Tool[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('dateAdded')
  const [categories, setCategories] = useState<string[]>([])
  const [editingTool, setEditingTool] = useState<Tool | null>(null)

  const extractCategories = (tools: Tool[]): string[] => {
    const uniqueCategories = new Set(tools.map(tool => tool.category))
    return Array.from(uniqueCategories)
  }

  useEffect(() => {
    const updatedCategories = extractCategories(tools)
    setCategories(updatedCategories)
    localStorage.setItem('categories', JSON.stringify(updatedCategories))
  }, [tools])

  useEffect(() => {
    let sorted = [...tools]
    if (selectedCategory) {
      sorted = sorted.filter(tool => tool.category === selectedCategory)
    }
    switch (sortBy) {
      case 'dateAdded':
        sorted.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        break
      case 'alphabetical':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'recentlyUsed':
        sorted.sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
        break
    }
    setFilteredTools(sorted)
  }, [tools, selectedCategory, sortBy])

  const handleEdit = (id: string) => {
    const toolToEdit = tools.find(tool => tool.id === id)
    if (toolToEdit) {
      setEditingTool(toolToEdit)
    }
  }

  const handleEditSubmit = (editedTool: Tool) => {
    const updatedTools = tools.map(tool => 
      tool.id === editedTool.id ? editedTool : tool
    )
    setTools(updatedTools)
    localStorage.setItem('tools', JSON.stringify(updatedTools))
    setEditingTool(null)
  }

  const handleDelete = (id: string) => {
    const updatedTools = tools.filter(tool => tool.id !== id)
    setTools(updatedTools)
    localStorage.setItem('tools', JSON.stringify(updatedTools))
  }

  const handleToolUse = (id: string) => {
    const updatedTools = tools.map(tool => 
      tool.id === id ? { ...tool, lastUsed: new Date().toISOString() } : tool
    )
    setTools(updatedTools)
    localStorage.setItem('tools', JSON.stringify(updatedTools))
  }

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="dateAdded">Date Added</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="recentlyUsed">Recently Used</option>
        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        {filteredTools.map((tool) => (
          <ToolCard 
            key={tool.id} 
            {...tool} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
            onUse={handleToolUse}
          />
        ))}
      </div>
      {editingTool && (
        <EditToolForm
          tool={editingTool}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingTool(null)}
          categories={categories}
        />
      )}
    </div>
  )
}

