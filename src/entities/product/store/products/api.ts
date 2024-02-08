import {api} from "../../../../shared/services/api";
import {baseEntitiesState} from "../../../../shared/utils/reducer-handlers.ts";
import {IProduct} from "../../model/product-model.ts";


export const productAPI = api.injectEndpoints({
  endpoints: (build) => ({
    loadProducts: build.query<baseEntitiesState & {list:IProduct[]},unknown>({
      query: (params:any = {}) => ({
        url: `/api/products`,
        params
      }),
      providesTags: () => ['Product']
    }),
  })
})

export const {
  useLoadProductsQuery
} = productAPI