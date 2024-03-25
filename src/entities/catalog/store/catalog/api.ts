import {api} from "../../../../shared/services/api";
import {baseEntitiesState} from "../../../../shared/utils/reducer-handlers.ts";
import {ParamsType} from "../../../../shared/models";
import {ICategory} from "../../../product/model/category-model.ts";
import {IProduct} from "../../../product/model/product-model.ts";
import {PricesRange} from "./reducer.ts";


export const catalogAPI = api.injectEndpoints({
  endpoints: (build) => ({
    loadCatalogCategory: build.query<baseEntitiesState & {item:ICategory},{query:{id:number},params:ParamsType}>({
      query: ({query,params}) => ({
        url: `/api/categories/${query.id || ''}`,
        params,
      }),
      providesTags: () => ['Catalog']
    }),
    loadCatalogProducts: build.query<baseEntitiesState & {list:IProduct[]},{params?: ParamsType}>({
      query: ({params}) => ({
        url: `/api/products/`,
        params
      }),
      providesTags: () => ['Catalog']
    }),
    loadPricesRange: build.query<{item:PricesRange},{params?: ParamsType}>({
      query: ({params}) => ({
        url: `/api/products/price/range`,
        params
      }),
      providesTags: () => ['Catalog']
    }),
  })
})

export const {
  useLazyLoadCatalogCategoryQuery,
  useLazyLoadCatalogProductsQuery,
  useLazyLoadPricesRangeQuery
} = catalogAPI