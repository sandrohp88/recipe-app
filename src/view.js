import { getRecipes, recipeSummary } from './recipe'
const renderRecipes = () => {
  const recipesContainer = document.querySelector('#recipes-container')
  const recipes = getRecipes()
  if (recipes) {
    // Render recipes
    recipes.forEach(recipe => {
      const recipeContainer = document.createElement('div')
      const recipeName = document.createElement('h2')
      const recipeText = document.createElement('p')
      recipeName.textContent = recipe.name
      recipeText.textContent = recipeSummary(recipe.id)
      recipeContainer.appendChild(recipeName)
      recipeContainer.appendChild(recipeText)
      recipesContainer.appendChild(recipeContainer)
    })
  } else {
    // Render a paragraph that says there is no recipes to show
    const noRecipesParagraph = document.createElement('p')
    noRecipesParagraph.textContent = 'No recipes to show'
    recipesContainer.appendChild(noRecipesParagraph)
  }
}
// const createRecipeSummaryDOM = recipe => {}
export { renderRecipes }
