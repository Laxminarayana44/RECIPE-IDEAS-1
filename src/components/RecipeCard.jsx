import React from 'react'

export default function RecipeCard({ recipe, onOpen }) {
  return (
    <div className="card" onClick={() => onOpen(recipe.idMeal)}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <div className="card-body">
        <h3 className="card-title">{recipe.strMeal}</h3>
      </div>
    </div>
  )
}
