import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
    }
  }

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter an ingredient (e.g., chicken, rice, tomato)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  )
}
