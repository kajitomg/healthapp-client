import {Main} from "../../../pages/main";
import {RoutesType} from "../models.ts";
import {Error} from "../../../pages/error";
import {Catalog} from "../../../pages/catalog";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CallIcon from '@mui/icons-material/Call';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const routes:RoutesType[] = [
  {
    id:'main',
    path: '/main',
    name:'Главная',
    redirect:'/login',
    element: <Main/>,
    children:[],
    nav:false,
    auth:true,
    params:{}
  },
  {
    id:'like',
    path: '/like',
    name:'Избранное',
    redirect:'/main',
    element: <Catalog/>,
    icon:<FavoriteIcon/>,
    children:[],
    nav:true,
    auth:true,
    params:{}
  },
  {
    id:'basket',
    path: '/basket',
    name:'Корзина',
    redirect:'/main',
    element: <Catalog/>,
    icon:<ShoppingCartIcon/>,
    children:[],
    nav:true,
    auth:true,
    params:{}
  },
  {
    id:'catalog',
    path: '/catalog',
    name:'Каталог',
    redirect:'/main',
    element: <Catalog/>,
    children:[],
    icon:<ManageSearchIcon/>,
    nav:true,
    auth:true,
    params:{}
  },
  {
    id:'contacts',
    path: '/contacts',
    name:'Контакты',
    redirect:'/main',
    element: <Catalog/>,
    icon:<CallIcon/>,
    children:[],
    nav:true,
    auth:true,
    params:{}
  },
  {
    id:'profile',
    path: '/profile',
    name:'Профиль',
    redirect:'/main',
    element: <Catalog/>,
    icon:<AccountCircleIcon/>,
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
