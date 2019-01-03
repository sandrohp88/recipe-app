import uuidv4 from 'uuid/v4'
import moment from 'moment'

let recipes = []
const getRecipes = () => recipes
const loadRecipes = () => {
  const recipesJSON = localStorage.getItem(recipes)
  return recipesJSON ? JSON.parse(recipesJSON) : []
}

const createRecipe = (name, description, ingredients) => {
  const id = uuidv4()
  const timestamp = moment().valueOf()
  const newRecipe = {}
  newRecipe.id = id
  newRecipe.name = name
  newRecipe.description = description
  newRecipe.createAt = timestamp
  newRecipe.updatedAt = timestamp
  newRecipe.ingredients = []
  ingredients.forEach(ingredient => {
    const currentIngredient = {
      name: ingredient,
      inStock: true
    }
    newRecipe.ingredients.push(currentIngredient)
  });
  recipes.push(newRecipe)
  saveRecipes()
  return id
}
const saveRecipes = () => {
  localStorage.setItem('recipes', JSON.stringify(recipes))
}
const removeRecipe = recipeId => {
  const recipeIndex = recipes.findIndex(recipe => recipeId === recipe.id)
  if (recipeIndex) {
    recipes.splice(recipeIndex, 1)
    saveRecipes()
  }
}

recipes = loadRecipes()
export {createRecipe, saveRecipes as saveRecipe, removeRecipe}