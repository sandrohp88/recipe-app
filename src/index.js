import { createRecipe, saveRecipe, removeRecipe } from './recipe'
const name = 'Torrejas'
const description = 'Slice the bred, Mix with eggs, Cook'
const ingredients = ['eggs', 'vanilla', 'cinnamon', 'sugar']
const id  = createRecipe(name, description,ingredients)
