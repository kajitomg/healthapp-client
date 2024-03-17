import {api} from "../../../../shared/services/api";
import {baseEntitiesState} from "../../../../shared/utils/reducer-handlers.ts";
import {ParamsType} from "../../../../shared/models";
import {IOrder} from "../../model/order-model.ts";
import {IProduct} from "../../../product/model/product-model.ts";


export const orderAPI = api.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<baseEntitiesState & {item:IOrder},{body:{email:string,phonenumber:string,comment?:string,customerId?:number,products?:IProduct[]},params?: ParamsType}>({
      query: ({params,body}) => ({
        url: `/api/orders/`,
        method:'POST',
        body,
        params
      }),
      invalidatesTags: ['Order'],
    }),
    cancelOrder: build.mutation<baseEntitiesState,{id:number,params?: ParamsType}>({
      query: ({params,id}) => ({
        url: `/api/orders/${id}`,
        method:'DELETE',
        params
      }),
      invalidatesTags: ['Order'],
    }),
    loadOrders: build.query<baseEntitiesState & {list:IOrder[]},{params?: ParamsType}>({
      query: ({params}) => ({
        url: `/api/orders/`,
        params
      }),
      providesTags: () => ['Order']
    }),
  })
})

export const {
  useCreateOrderMutation,
  useCancelOrderMutation,
  useLazyLoadOrdersQuery
} = orderAPI