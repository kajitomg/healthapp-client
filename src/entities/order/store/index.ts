import {default as ordersReducers, ordersActionsList} from './orders/reducer.ts'



const orderState = {
  orders:ordersReducers,
}

const orderActions = {
  order:ordersActionsList,
}

export {orderState,orderActions}