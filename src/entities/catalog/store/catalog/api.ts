import {api} from "../../../../shared/services/api";
import {ParamsType} from "../../../../shared/models";
import {PricesRange} from "./reducer.ts";


export const catalogAPI = api.injectEndpoints({
  endpoints: (build) => ({
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
  useLazyLoadPricesRangeQuery
} = catalogAPI