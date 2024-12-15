'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import ToolSubmissionForm from './components/ToolSubmissionForm'
import ToolGrid from './components/ToolGrid'

export default function Home() {
  const [tools, setTools] = useState([])

  useEffect(() => {
    const storedTools = localStorage.getItem('tools')
    if (storedTools) {
      setTools(JSON.parse(storedTools))
    }
  }, [])

  const handleNewTool = (newTool) => {
    const updatedTools = [...tools, newTool]
    setTools(updatedTools)
    localStorage.setItem('tools', JSON.stringify(updatedTools))
  }

  return (
    <main className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <Header />
        <ToolSubmissionForm onNewTool={handleNewTool} />
        <ToolGrid tools={tools} setTools={setTools} />
      </div>
    </main>
  )
}

