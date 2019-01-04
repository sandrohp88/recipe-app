import uuidv4 from 'uuid/v4'
import moment from 'moment'

let recipes = []
const getRecipes = () => recipes
const loadRecipes = () => {
  const recipesJSON = localStorage.getItem('recipes')
  return recipesJSON ? JSON.parse(recipesJSON) : []
}

const createRecipe = () => {
  const id = uuidv4()
  const timestamp = moment().valueOf()
  const newRecipe = {}
  newRecipe.id = id
  newRecipe.name = 'Unnamed recipe'
  newRecipe.description = ''
  newRecipe.createAt = timestamp
  newRecipe.updatedAt = timestamp
  newRecipe.ingredients = []
  // ingredients.forEach(ingredient => {
  //   const currentIngredient = {
  //     name: ingredient,
  //     inStock: fase
  //   }
  //   newRecipe.ingredients.push(currentIngredient)
  // })
  recipes.push(newRecipe)
  saveRecipes()
  return id
}
const updateRecipe = (recipeId, updates) => {
  const recipe = recipes.find(recipe => recipe.id === recipeId)
  if (recipe) {
    if (typeof updates.name === 'string') {
      recipe.name = updates.name
      recipe.updatedAt = moment().valueOf()
    }
    if (typeof updates.description === 'string') {
      recipe.description = updates.description
      recipe.updatedAt = moment().valueOf()
    }
    if (typeof updates.ingredients === 'object') {
      recipe.ingredients = updates.ingredients
      recipe.updatedAt = moment().valueOf()
    }
    saveRecipes()
  } else {
    throw new Error('No recipe found')
  }
}
const saveRecipes = () => {
  localStorage.setItem('recipes', JSON.stringify(recipes))
}
const removeRecipe = recipeId => {
  const recipeIndex = recipes.findIndex(recipe => recipeId === recipe.id)
  if (recipeIndex > -1) {
    recipes.splice(recipeIndex, 1)
    saveRecipes()
  }
}
const recipeSummary = recipeId => {
  const recipe = recipes.find(recipe => recipeId === recipe.id)

  // Found recipe
  let counter = 0
  if (recipe) {
    recipe.ingredients.forEach(ingredient => {
      if (ingredient.inStock) {
        counter++
      }
    })
    let summary = 'Locol'

    if (counter === recipe.ingredients.length) {
      summary = 'You have all the ingredients'
    } else if (counter === 0) {
      summary = "You don't have any of the ingredients"
    } else {
      summary = `You have ${counter} of ${recipe.ingredients.length} ingredients`
    }
    return summary
  } else {
    throw new Error(`No recipe with ${recipeId} found`)
  }
}
recipes = loadRecipes()
export {
  loadRecipes,
  createRecipe,
  saveRecipes,
  updateRecipe,
  getRecipes,
  recipeSummary,
  removeRecipe
}
