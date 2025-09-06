import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import RecipeCard from './components/RecipeCard'
import RecipeModal from './components/RecipeModal'
import { searchByIngredient } from './api'

export default function App() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const handleSearch = async (ingredient) => {
    setLoading(true)
    setError(null)
    setRecipes([])
    try {
      const json = await searchByIngredient(ingredient)
      setRecipes(json.meals || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">Recipe Ideas</h1>
          <p className="subtitle">Find meals based on the ingredients you have</p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading && <p style={{ marginTop: 16 }}>Searching recipes…</p>}
        {error && <div className="alert">{error}</div>}
        {!loading && recipes.length === 0 && !error && (
          <p style={{ marginTop: 16 }}>No recipes found. Try another ingredient.</p>
        )}

        <div className="grid">
          {recipes.map((r) => (
            <RecipeCard key={r.idMeal} recipe={r} onOpen={(id) => setSelectedId(id)} />
          ))}
        </div>

        <footer className="footer">
          Data from <a href="https://www.themealdb.com/" target="_blank" rel="noreferrer">TheMealDB</a>.
        </footer>

        <RecipeModal id={selectedId} onClose={() => setSelectedId(null)} />
      </div>
    </div>
  )
}
