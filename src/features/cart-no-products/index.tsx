import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {useCallback} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {NoItemsLayout} from "../../shared/components/no-items-layout";

interface CartNoProductsProps {
  
  available?:boolean,
  
}

const CartNoProducts = (props:CartNoProductsProps) => {
  const {setPage} = usePage()
  const session = useTypedSelector(state => state.session)
  
  const callbacks = {
    
    onCatalogClick:useCallback(() => {
      setPage('catalogItems')
    },[]),
    
    onProfileClick:useCallback(() => {
      setPage('login')
    },[])
  }
  
  return (
    <NoItemsLayout title={'В корзине пусто'} available={props.available}>
      <Typography fontSize={'small'}>Воспользуйтесь <Button variant={'text'} size={'small'} onClick={callbacks.onCatalogClick}><Typography textTransform={'capitalize'} fontSize={'small'} lineHeight={'10px'}>каталогом</Typography></Button></Typography>
      {!session.exists && <Typography fontSize={'small'}>Войдите в <Button variant={'text'} size={'small'} onClick={callbacks.onProfileClick}><Typography textTransform={'capitalize'} fontSize={'small'} lineHeight={'10px'}>профиль</Typography></Button>, если у вас были товары</Typography>}
    </NoItemsLayout>
  )
};

export {CartNoProducts};