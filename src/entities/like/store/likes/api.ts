import {api} from "../../../../shared/services/api";
import {baseEntitiesState} from "../../../../shared/utils/reducer-handlers.ts";
import {ParamsType} from "../../../../shared/models";
import {IProduct} from "../../../product/model/product-model.ts";
import {ILike} from "../../model/like-model.ts";


export const cartAPI = api.injectEndpoints({ //UPD Протестировать api catalog и при успехе переделать подобно
  endpoints: (build) => ({
    loadLike: build.query<baseEntitiesState & {item:ILike}, { id:number,params?:ParamsType }>({
      query: ({id,params}) => {
        return {
          url: `/api/likes/${id}`,
          params: params
        }},
      providesTags: () => ['Like']
    }),
    addProductsToLike: build.mutation<baseEntitiesState & {item:ILike}, { id?:number,products:IProduct[],params?:ParamsType }>({
      query: ({id,products,params}) => ({
        url: `/api/likes/products/add/${id}`,
        method: 'PATCH',
        body:{products},
        params: params
      }),
      invalidatesTags: ['Like'],
      extraOptions:{maxRetries:0}
    }),
    deleteProductsFromLike: build.mutation<baseEntitiesState & {item:ILike}, { id?:number,products:IProduct[],params?:ParamsType }>({
      query: ({id,params, products}) => ({
        url: `/api/likes/products/delete/${id}`,
        method: 'PATCH',
        body:{products},
        params: params
      }),
      invalidatesTags: ['Like'],
      extraOptions:{maxRetries:0}
    }),
  })
})

export const {
  useAddProductsToLikeMutation,
  useDeleteProductsFromLikeMutation,
  useLoadLikeQuery,
  useLazyLoadLikeQuery
} = cartAPI
