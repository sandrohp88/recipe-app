import { getRecipes, updateRecipe, saveRecipes, removeRecipe } from './recipe'
import moment from 'moment'
const recipeId = location.hash.substring(1)


let recipes = getRecipes()
let recipe = recipes.find(recipe => recipe.id === recipeId)
if (!recipe) {
  location.assign('/')
}

const homeBtn = document.querySelector('#home')
homeBtn.addEventListener('click', sender =>{
  location.assign('/')
})
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
    const description = sender.target.value
    updateRecipe(recipeId, { description: description })
    recipe.updatedAt = moment().valueOf()
    saveRecipes()
  })
}
// Setup ingredients
// const ingredientsItems = document.querySelector('#ingredients-items')
if (typeof recipe.ingredients === 'object') {
  updateRecipe(recipeId, { ingredients: recipe.ingredients })
  recipe.updatedAt = moment().valueOf()
  saveRecipes()
}

// Setup remove button
const removeBtn = document.querySelector('#remove-recipe-btn')
removeBtn.addEventListener('click', sender => {
  removeRecipe(recipeId)
  location.assign('/')
})

// Setup add Ingredient button
const addIngredientBtn = document.querySelector('#add-ingredient-btn')
const addIngredientText = document.querySelector('#add-ingredient-text')
addIngredientBtn.addEventListener('click', sender => {
  if (addIngredientText.value.trim().length > 0) {
    const newIngredient = {
      name: addIngredientText.value,
      inStock: false
    }
    recipe.ingredients.push(newIngredient)
    saveRecipes()
    renderIngredients()
    addIngredientText.value = ''
  }
})
const renderIngredients = () => {
  const ingredientsItems = document.querySelector('#ingredients-items')
  ingredientsItems.innerHTML = ''
  recipe.ingredients.forEach(ingredient => {
    const newIngredient = createIngredientDOM(ingredient)
    ingredientsItems.appendChild(newIngredient)
  })
}
const createIngredientDOM = ingredient => {
  const newIngredientDOM = document.createElement('label')
  const ingredientItemContainer = document.createElement('div')
  const checkIngredient = document.createElement('input')
  const ingredientName = document.createElement('span')
  const removeIngredientBtn = document.createElement('button')

  // Setup styles
  checkIngredient.classList.add('checkbox')
  removeIngredientBtn.classList.add('button', 'button--text')
  newIngredientDOM.classList.add('list-item')
  ingredientItemContainer.classList.add('list-item__container')

  checkIngredient.checked = ingredient.inStock
  checkIngredient.setAttribute('type', 'checkbox')
  checkIngredient.addEventListener('change', sender => {
    ingredient.inStock = !ingredient.inStock
    renderIngredients()
    saveRecipes()
  })

  ingredientName.textContent = ingredient.name
  removeIngredientBtn.textContent = 'remove'
  removeIngredientBtn.addEventListener('click', sender => {
    removeIngredient(ingredient.name)
  })

  newIngredientDOM.appendChild(ingredientItemContainer)
  ingredientItemContainer.appendChild(checkIngredient)
  ingredientItemContainer.appendChild(ingredientName)
  newIngredientDOM.appendChild(removeIngredientBtn)

  return newIngredientDOM
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
