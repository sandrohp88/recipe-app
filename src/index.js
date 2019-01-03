import { loadRecipes, createRecipe, saveRecipe, removeRecipe } from './recipe'
import { renderRecipes } from './view'
const name = 'Torrejas'
const description = 'Cook in a frypan with enough vegetable oil'
const ingredients = ['eggs', 'oil','vanila']
renderRecipes()