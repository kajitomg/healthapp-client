import {api} from "../../../../shared/services/api";
import {baseEntitiesState} from "../../../../shared/utils/reducer-handlers.ts";
import {IProduct} from "../../model/product-model.ts";
import {ParamsType} from "../../../../shared/models";


export const productAPI = api.injectEndpoints({
  endpoints: (build) => ({
    loadProducts: build.query<baseEntitiesState & {list:IProduct[]},{params?: ParamsType}>({
      query: ({params}) => ({
        url: `/api/products/`,
        params
      }),
      providesTags: () => ['Product']
    }),
    loadProduct: build.query<baseEntitiesState & {item:IProduct},{id?:number | string, params?: ParamsType}>({
      query: ({id,params}) => ({
        url: `/api/products/${id || ''}`,
        params
      }),
      providesTags: () => ['Product']
    }),
  })
})

export const {
  useLoadProductsQuery,
  useLazyLoadProductsQuery,
  useLazyLoadProductQuery
} = productAPI