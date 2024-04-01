import {api} from "../../../../shared/services/api";
import {baseEntitiesState} from "../../../../shared/utils/reducer-handlers.ts";
import {IProduct} from "../../../product/model/product-model.ts";
import {ParamsType} from "../../../../shared/models";
import {ICategory} from "../../../product/model/category-model.ts";


export const searchAPI = api.injectEndpoints({
  endpoints: (build) => ({
    searchProducts: build.query<baseEntitiesState & {list:IProduct[]},{params?: ParamsType}>({
      query: ({params}) => ({
        url: `/api/products/`,
        params
      }),
      providesTags: () => ['Search']
    }),
    searchCategories: build.query<baseEntitiesState & {list:ICategory[]},{params?: ParamsType}>({
      query: ({params}) => ({
        url: `/api/categories/`,
        params
      }),
      providesTags: () => ['Search']
    }),
  })
})

export const {
  useLazySearchCategoriesQuery,
  useLazySearchProductsQuery
} = searchAPI