import {alpha} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import {blue} from "@mui/material/colors";
import React, {
  ChangeEventHandler,
  lazy,
  memo,
  MouseEventHandler,
  Suspense,
  useCallback,
  useRef,
  useState
} from "react";
import {CatalogPopoverButton} from "../catalog-popover-button";
import {CatalogSearchButton} from "../catalog-search-button";
import useTheme from "@mui/material/styles/useTheme";
import {useLazySearchCategoriesQuery, useLazySearchProductsQuery} from "../../entities/search/store/search/api.ts";
import {useDebounce} from "../../shared/hooks/use-debounce.ts";
import Box from "@mui/material/Box";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {useCatalog} from "../../entities/catalog/hooks/use-catalog.ts";
const CatalogPopover = lazy(() => import("../catalog-popover"))
const CatalogSearchPopper= lazy(() => import("../catalog-search-popper"))

/*
  Поиск по названию
 */
const CatalogSearch = memo(() => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState<HTMLFormElement | null>(null);
  const [anchorSearchEl, setAnchorSearchEl] = React.useState<HTMLFormElement | null>(null);
  const ref = useRef<HTMLFormElement>(null)
  const [value, setValue] = useState<string>('')
  const [searchProducts] = useLazySearchProductsQuery()
  const [searchCategories] = useLazySearchCategoriesQuery()
  const {setPage,pages,page} = usePage()
  
  const {setParams,params} = useParams({page:pages.list.find(page => page.id === 'catalog')})
  
  const {loadCatalogProducts} = useCatalog()
  
  const callbacks = {
    
    setProducts:useCallback(() => {
      loadCatalogProducts({
        params:params,
        query:{paginationPageId:1}
      })
    },[loadCatalogProducts,params]),
    
    onOpenPopover:useCallback(() => {
      setAnchorEl(ref.current);
    },[ref]),
    
    onClosePopover:useCallback(() => {
      setAnchorEl(null);
    },[ref]),
    
    onCloseSearchPopover:useCallback(() => {
      setAnchorSearchEl(null)
      setValue('')
    },[ref]),
    
    onChange:useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
      setValue(event.target.value)
      callbacks.onSearch(event.target.value)
    },[searchCategories,searchProducts,value]),
    
    onSearch:useDebounce(useCallback(async (value:string) => {
      if(value){
        setAnchorSearchEl(ref.current)
      }else{
        callbacks.onCloseSearchPopover()
        
      }
      await searchCategories({
        params:{
          'search[or][name]':value
        }
      }),
      await searchProducts({
        params:{
          'search[or][name]':value
        }
      })
    },[searchCategories,searchProducts,ref]),300),
    
    onSubmit:useCallback<MouseEventHandler<HTMLButtonElement>>((event) => {
      event.preventDefault()
      if(!params?.search && page?.id === 'catalogItems' && !value){
        return
      }
      callbacks.setProducts()
      setPage('catalogItems')
      setParams({search:{name:value}},pages?.list?.find(page => page.id === 'catalogItems'))
      
      callbacks.onCloseSearchPopover()
    },[value,page,params]),
  }
  return (
    <Box>
      <Suspense fallback={null}>
        <CatalogPopover anchorEl={anchorEl} onClose={callbacks.onClosePopover}/>
      </Suspense>
      <Paper
        ref={ref}
        component="form"
        sx={{
          p: '2px 4px',
          mx: 3,
          display: 'flex',
          boxShadow:'none',
          alignItems: 'center',
          width: 'auto',
          flex: 1,
          position:'relative',
          background:alpha(blue[50], 0.3),
          '&:hover':{
            cursor:'pointer',
            boxShadow:(theme) => theme.shadows[5],
          },
          [theme.breakpoints.down('sm')]: {
            mx: 1,
          },
          
        }}
      >
        <Suspense fallback={null}>
          <CatalogSearchPopper anchorEl={anchorSearchEl} onClose={callbacks.onCloseSearchPopover}/>
        </Suspense>
        <CatalogPopoverButton onClick={callbacks.onOpenPopover}/>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            
          }}
          placeholder="Поиск по каталогу"
          inputProps={{ 'aria-label': 'введите название' }}
          value={value}
          onChange={callbacks.onChange}
        />
        <CatalogSearchButton onClick={callbacks.onSubmit}/>
      </Paper>
    </Box>
  );
});

export {CatalogSearch};