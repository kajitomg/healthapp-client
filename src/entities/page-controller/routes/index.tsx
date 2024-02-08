import {Main} from "../../../pages/main";
import {RoutesType} from "../models.ts";
import {Error} from "../../../pages/error";
import {Products} from "../../../pages/products";

const routes:RoutesType[] = [
  {
    id:'main',
    path: '/main',
    name:'Главная',
    redirect:'/login',
    element: <Main/>,
    children:[],
    nav:true,
    auth:true,
    params:{}
  },
  {
    id:'products',
    path: '/products',
    name:'Продукты',
    redirect:'/main',
    element: <Products/>,
    children:[],
    nav:true,
    auth:true,
    params:{}
  },
  {
    id:'error',
    path: '/*',
    name:'Ошибка',
    redirect:'/main',
    element: <Error/>,
    nav:false,
    children:[],
    auth:true,
    params:{}
  },
]

export {routes}
