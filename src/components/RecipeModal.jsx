import React, { useEffect, useState } from 'react'
import { lookupRecipe } from '../api'

export default function RecipeModal({ id, onClose }) {
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    lookupRecipe(id)
      .then((json) => {
        setRecipe(json.meals ? json.meals[0] : null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (!id) return null

  return (
    <div className="modal-backdrop" onClick={(e) => e.target.classList.contains('modal-backdrop') && onClose()}>
      <div className="modal">
        <button className="close" onClick={onClose}>✕</button>
        {loading && <p>Loading recipe…</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {recipe && (
          <>
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>Instructions</h3>
            <p>{recipe.strInstructions}</p>
            <h3>Ingredients</h3>
            <ul>
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = recipe[`strIngredient${i+1}`]
                const measure = recipe[`strMeasure${i+1}`]
                return ingredient ? <li key={i}>{ingredient} — {measure}</li> : null
              })}
            </ul>
            {recipe.strYoutube && (
              <p>
                <a href={recipe.strYoutube} target="_blank" rel="noreferrer">Watch on YouTube ↗</a>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
