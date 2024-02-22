import {api} from "../../../../shared/services/api";
import {baseEntitiesState} from "../../../../shared/utils/reducer-handlers.ts";
import {ICategory} from "../../model/category-model.ts";


export const categoryAPI = api.injectEndpoints({
  endpoints: (build) => ({
    loadCategories: build.query<baseEntitiesState & {list:ICategory[]},unknown>({
      query: (params?:any) => ({
        url: `/api/categories`,
        params,
      }),
      providesTags: () => ['Category']
    }),
    loadCategory: build.query<baseEntitiesState & {item:ICategory},{id?:number | string, params?: {[name:string]:string|number }}>({
      query: ({id,params}) => ({
        url: `/api/categories/${id}`,
        params,
      }),
      providesTags: () => ['Category']
    }),
  })
})

export const {
  useLoadCategoriesQuery,
  useLoadCategoryQuery,
  useLazyLoadCategoryQuery
} = categoryAPI