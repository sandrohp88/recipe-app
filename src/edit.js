import { getRecipes, updateRecipe, saveRecipes, removeRecipe } from './recipe'
import moment from 'moment'
const recipeId = location.hash.substring(1)
let recipes = getRecipes()
let recipe = recipes.find(recipe => recipe.id === recipeId)
if (!recipe) {
  location.assign('/')
}

// Setup recipe Name
const recipeName = document.querySelector('#recipe-name')
if (typeof recipe.name === 'string') {
  recipeName.value = recipe.name
  recipeName.addEventListener('input', sender => {
    const name = sender.target.value
    updateRecipe(recipeId, { name: name })
    recipe.updatedAt = moment().valueOf()
    saveRecipes()
  })
}
// Setup recipe description
const recipeDescription = document.querySelector('#description-content')
if (typeof recipe.description === 'string') {
  recipeDescription.textContent = recipe.description
  recipeDescription.addEventListener('input', sender => {
    updateRecipe(recipeId, { description: recipe.description })
    recipe.updatedAt = moment().valueOf()
    saveRecipes()
  })
  // Setup ingredients
  const ingredientsItems = document.querySelector('#ingredients-items')
  if (typeof recipe.ingredients === 'object') {
    updateRecipe(recipeId, { ingredients: recipe.ingredients })
    recipe.updatedAt = moment().valueOf()
    saveRecipes()
  }
}

// Setup remove button
const removeBtn = document.querySelector('#remove-recipe-btn')
removeBtn.addEventListener('click', sender => {
  removeRecipe(recipeId)
  location.assign('/')
})

// Setup add recipe
const addIngredientBtn = document.querySelector('#add-ingredient-btn')
const addIngredientText = document.querySelector('#add-ingredient-text')
addIngredientBtn.addEventListener('click', sender => {
  if (addIngredientText.value.trim().length > 0) {
    const newIngredient = {
      name: addIngredientText.value,
      inStock: false
    }
    recipe.ingredients.push(newIngredient)
    renderIngredients()
    addIngredientText.value = ''
    saveRecipes()
  }
})
const renderIngredients = () => {
  const ingredientsItems = document.querySelector('#ingredients-items')
  ingredientsItems.innerHTML = ''
  recipe.ingredients.forEach(ingredient => {
    const newIngredientDOM = document.createElement('label')
    const checkIngredient = document.createElement('input')
    const ingredientItemContainer = document.createElement('div')
    const ingredientName = document.createElement('span')
    const removeIngredientBtn = document.createElement('button')

    checkIngredient.checked = ingredient.inStock
    checkIngredient.setAttribute('type', 'checkbox')
    checkIngredient.addEventListener('change', sender => {
      ingredient.inStock = !ingredient.inStock
      renderIngredients()
    })

    ingredientName.textContent = ingredient.name
    removeIngredientBtn.textContent = 'remove'
    removeIngredientBtn.addEventListener('click', sender => {
      removeIngredient(ingredient.name)
    })

    ingredientItemContainer.appendChild(checkIngredient)
    ingredientItemContainer.appendChild(ingredientName)
    ingredientItemContainer.appendChild(removeIngredientBtn)
    newIngredientDOM.appendChild(ingredientItemContainer)
    ingredientsItems.appendChild(newIngredientDOM)
  })
}

const removeIngredient = name => {
  const ingredientIndex = recipe.ingredients.findIndex(
    ingredient => ingredient.name.toLowerCase() === name.toLowerCase()
  )
  if (ingredientIndex > -1) {
    recipe.ingredients.splice(ingredientIndex, 1)
    renderIngredients()
  } else {
    throw new Error(`No ingredient named ${name} was found`)
  }
}
renderIngredients()
