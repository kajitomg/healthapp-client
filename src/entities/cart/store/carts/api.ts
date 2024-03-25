import {api} from "../../../../shared/services/api";
import {baseEntitiesState} from "../../../../shared/utils/reducer-handlers.ts";
import {ParamsType} from "../../../../shared/models";
import {ICart} from "../../model/cart-model.ts";
import {IProduct} from "../../../product/model/product-model.ts";


export const cartAPI = api.injectEndpoints({ //UPD Протестировать api catalog и при успехе переделать подобно
  endpoints: (build) => ({
    loadCart: build.query<baseEntitiesState & {item:ICart}, { id:number,params?:ParamsType }>({
      query: ({id,params}) => {
        return {
          url: `/api/carts/${id}`,
          params: params
        }},
      providesTags: () => ['Cart']
    }),
    addProductsToCart: build.mutation<baseEntitiesState & {item:ICart}, { id?:number,products:IProduct[],params?:ParamsType }>({
      query: ({id,products,params}) => ({
        url: `/api/carts/products/add/${id}`,
        method: 'PATCH',
        body:{products},
        params: params
      }),
      invalidatesTags: ['Cart'],
      extraOptions:{maxRetries:0}
    }),
    deleteProductsFromCart: build.mutation<baseEntitiesState & {item:ICart}, { id?:number,products:IProduct[],params?:ParamsType }>({
      query: ({id,params, products}) => ({
        url: `/api/carts/products/delete/${id}`,
        method: 'PATCH',
        body:{products},
        params: params
      }),
      invalidatesTags: ['Cart'],
      extraOptions:{maxRetries:0}
    }),
    incrementProductInCart: build.mutation<baseEntitiesState & {item:ICart}, { id?:number,product:IProduct,params?:ParamsType }>({
      query: ({id,product,params}) => ({
        url: `/api/carts/products/increment/${id}`,
        method: 'PATCH',
        body:{product},
        params: params
      }),
      invalidatesTags: ['Cart'],
      extraOptions:{maxRetries:0}
    }),
    decrementProductInCart: build.mutation<baseEntitiesState & {item:ICart}, { id?:number,product:IProduct,params?:ParamsType }>({
      query: ({id,params, product}) => ({
        url: `/api/carts/products/decrement/${id}`,
        method: 'PATCH',
        body:{product},
        params: params
      }),
      invalidatesTags: ['Cart'],
      extraOptions:{maxRetries:0}
    }),
  })
})

export const {
  useAddProductsToCartMutation,
  useDeleteProductsFromCartMutation,
  useIncrementProductInCartMutation,
  useDecrementProductInCartMutation,
  useLoadCartQuery,
  useLazyLoadCartQuery
} = cartAPI
