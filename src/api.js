const BASE = 'https://www.themealdb.com/api/json/v1/1'

// Search recipes by ingredient
export async function searchByIngredient(ingredient) {
  const url = `${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

// Lookup full recipe details
export async function lookupRecipe(id) {
  const url = `${BASE}/lookup.php?i=${id}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}
