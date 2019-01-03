import { getRecipes } from './recipe'
const filters = {
  searchText: ''
}
const searchRecipe = () => {
  const recipes = getRecipes()
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(filters.searchText.toLowerCase())
  )
  return filteredRecipes
}

const getFilters = () => filters
const setFilters = searchText => {
  if (typeof searchText === 'string') {
    filters.searchText = searchText
  }
}
export {getFilters, setFilters,searchRecipe}
