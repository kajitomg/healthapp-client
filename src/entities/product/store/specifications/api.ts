import {api} from "../../../../shared/services/api";
import {baseEntitiesState} from "../../../../shared/utils/reducer-handlers.ts";
import {ISpecification} from "../../model/specification-model.ts";
import {ParamsType} from "../../../../shared/models";


export const specificationAPI = api.injectEndpoints({
  endpoints: (build) => ({
    loadSpecifications: build.query<baseEntitiesState & {list:ISpecification[]}, { params?:ParamsType }>({
      query: ({params}) => ({
        url: `/api/specifications`,
        params,
      }),
      providesTags: () => ['Specifications']
    }),
  })
})

export const {
  useLazyLoadSpecificationsQuery,
  useLoadSpecificationsQuery
} = specificationAPI