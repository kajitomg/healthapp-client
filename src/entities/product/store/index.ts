import { default as productsReducers} from './products/reducer.ts'
import { default as categoriesReducers} from './categories/reducer.ts'



const productState = {
  products:productsReducers,
  categories:categoriesReducers,
}

export {productState}