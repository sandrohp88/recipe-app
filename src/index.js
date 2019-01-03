import { setFilters } from "./filters";
import { loadRecipes, createRecipe, saveRecipe, removeRecipe } from './recipe'
import { renderRecipes } from './view'
const name = 'Torrejas'
const description = 'Cook in a frypan with enough vegetable oil'
const ingredients = ['eggs', 'oil','vanilla']
document.querySelector('#btn-add-recipe').addEventListener('click',sender =>
  {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
  })
document.querySelector('#search-recipe').addEventListener('input',sender =>{
  setFilters(sender.target.value)
  renderRecipes()
})
renderRecipes()