import {RoutesType} from "../models.ts";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {lazy} from "react";

const Product = lazy(() => import("../../../pages/product"))
const Cart = lazy(() => import("../../../pages/cart"))
const Profile = lazy(() => import("../../../pages/profile"))
const Login = lazy(() => import("../../../pages/login"))
const Registration = lazy(() => import("../../../pages/registration"))
const Like = lazy(() => import("../../../pages/personal-account"))
const Shops = lazy(() => import("../../../pages/shops"))
const ChangePassword = lazy(() => import("../../../pages/change-password"))
const Main = lazy(() => import("../../../pages/main"))
const Error = lazy(() => import("../../../pages/error"))
const Catalog = lazy(() => import("../../../pages/catalog"))

const routes:RoutesType[] = [
  {
    id:'main',
    path: ['/main','/'],
    name:'Главная',
    redirect:'/login',
    element: <Main/>,
    children:[],
    nav:false,
    params:{}
  },
  {
    id:'like',
    path: '/profile/like',
    name:'Избранное',
    redirect:'/main',
    element: <Like/>,
    icon:<FavoriteIcon/>,
    children:[],
    nav:true,
    params:{}
  },
  
  {
    id:'order',
    path: '/profile/order',
    name:'Заказы',
    redirect:'/login',
    element: <Like/>,
    icon:<FavoriteIcon/>,
    children:[],
    nav:false,
    params:{}
  },
  {
    id:'cart',
    path: '/cart',
    name:'Корзина',
    redirect:'/main',
    element: <Cart/>,
    icon:<ShoppingCartIcon/>,
    children:[],
    nav:true,
    params:{}
  },
  {
    id:'catalog',
    path: '/catalog/:id',
    name:'Каталог',
    redirect:'/main',
    element: <Catalog/>,
    children:[],
    icon:<ManageSearchIcon/>,
    nav:false,
    params:{}
  },
  {
    id:'catalogItems',
    path: '/catalog',
    name:'Каталог',
    redirect:'/main',
    element: <Catalog/>,
    children:[],
    icon:<ManageSearchIcon/>,
    nav:true,
    params:{}
  },
  {
    id:'shops',
    path: '/shops',
    name:'Магазины',
    redirect:'/main',
    element: <Shops/>,
    icon:<StoreIcon/>,
    children:[],
    nav:true,
    params:{}
  },
  {
    id:'profile',
    path: '/profile',
    name:'Профиль',
    redirect:'/main',
    element: <Profile/>,
    icon:<AccountCircleIcon/>,
    children:[],
    nav:true,
    menu:true,
    auth:true,
    params:{}
  },
  {
    id:'product',
    path: '/product/:id',
    name:'Продукт',
    redirect:'/main',
    element: <Product/>,
    children:[],
    nav:false,
    params:{}
  },
  {
    id:'login',
    path: '/login',
    name:'Авторизация',
    redirect:'/main',
    element: <Login/>,
    children:[],
    nav:false,
    auth:false,
    params:{}
  },
  {
    id:'changePassword',
    path: '/profile/password/change',
    name:'Смена пароля',
    redirect:'/main',
    element: <ChangePassword/>,
    children:[],
    nav:false,
    auth:true,
    params:{}
  },
  {
    id:'registration',
    path: '/registration',
    name:'Регистрация',
    redirect:'/main',
    element: <Registration/>,
    children:[],
    nav:false,
    auth:false,
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
    params:{}
  },
]

export {routes}
