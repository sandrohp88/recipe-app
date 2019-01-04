import { getRecipes, recipeSummary, removeRecipe } from './recipe'
import { searchRecipe } from './filters'
const renderRecipes = () => {
  const recipesContainer = document.querySelector('#recipes-container')
  recipesContainer.innerHTML = ''
  const recipes = searchRecipe()
  if (recipes) {
    // Render recipes
    recipes.forEach(recipe => {
      const recipeContainer = document.createElement('div')
      recipeContainer.addEventListener('click', sender =>{
        location.assign(`/edit.html#${recipe.id}`)
      })
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
export { renderRecipes, renderIngredients }
