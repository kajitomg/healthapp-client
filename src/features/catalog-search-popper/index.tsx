import {Popper, PopperProps, Typography} from "@mui/material";
import {memo, useCallback} from "react";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {ICategory} from "../../entities/product/model/category-model.ts";
import Box from "@mui/material/Box";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {List} from "../../shared/components/list";
import Button from "@mui/material/Button";


type CatalogSearchPopperProps = {
  
  anchorEl?:HTMLFormElement | null,
  
  onClose?:() => void
  
} & Omit<PopperProps, 'onClose' | 'open'>

const CatalogSearchPopper = memo((props:CatalogSearchPopperProps) => {
  const {anchorEl = null, onClose, ...defProps} = props
  const {pages, page,setPage} = usePage()
  const {setParams} = useParams({page})
  const search = useTypedSelector(state => state.search)
  
  const callbacks = {
    
    onTabProductClick:useCallback((id:number) => () => {
      setPage('product' , id.toString())
      setParams({},pages.list.find(page => page.id === 'product'))
      onClose && onClose()
    },[setParams,setPage,page]),
    
    onTabCategoryClick:useCallback((id:number) => () => {
      setPage('catalog' , id.toString())
      setParams({},pages.list.find(page => page.id === 'catalog'))
      onClose && onClose()
    },[setParams,setPage,page]),
  }
  const renders = {
    itemProduct:useCallback((item:IProduct) => (
      <Button key={item.id} variant={'text'} onClick={callbacks.onTabProductClick(item.id)}>
        <Typography fontSize={'small'} textTransform={'capitalize'} color={'black'}>{item.name}</Typography>
      </Button>
    ),[]),
    
    itemCategory:useCallback((item:ICategory) => (
      <Button key={item.id} variant={'text'} onClick={callbacks.onTabCategoryClick(item.id)}>
        <Typography fontSize={'small'} textTransform={'capitalize'} color={'black'}>{item.name}</Typography>
      </Button>
    ),[])
  }
  
  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'catalog-search-popper' : undefined;
  
  return (
    <Popper
      {...defProps}
      id={id}
      open={isOpen}
      anchorEl={anchorEl}
      placement={'bottom'}
      disablePortal
      sx={{
        background:'whitesmoke',
        zIndex:10000,
        width:'100%',
        borderRadius:1,
        p:1
      }}
      modifiers={[
        {
          name: 'flip',
          enabled: true,
          options: {
            altBoundary: true,
            rootBoundary: 'document',
            padding: 8,
          },
        },
        {
          name: 'preventOverflow',
          enabled: true,
          options: {
            altAxis: true,
            altBoundary: true,
            tether: true,
            rootBoundary: 'document',
            padding: 8,
          },
        },
      ]}
    >
      <Box display={'flex'} flexDirection={'column'} pt={2} width={'100%'} maxHeight={'400px'} overflow={'auto'}>
        {search.products?.list.length ? <Box display={'flex'} flexDirection={'column'}>
          <Typography fontWeight={'bold'} my={0.5}>Продукты:</Typography>
          <List list={search.products?.list} renderItem={renders.itemProduct}/>
        </Box> : null}
        {search.categories?.list.length ? <Box display={'flex'} flexDirection={'column'}>
          <Typography fontWeight={'bold'} my={0.5}>Категории:</Typography>
          <List list={search.categories?.list} renderItem={renders.itemCategory}/>
        </Box> : null}
        {!search.categories?.list.length && !search.products?.list.length ?
          <Box display={'flex'} justifyContent={'center'}>
            <Typography fontWeight={'bold'} fontSize={'small'} my={0.5}>Нет совпадений</Typography>
          </Box> : null}
      </Box>
    </Popper>
  );
  
});

export default CatalogSearchPopper;