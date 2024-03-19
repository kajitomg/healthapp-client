import {Button, Typography} from "@mui/material";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {useCallback} from "react";
import {NoItemsLayout} from "../../shared/components/no-items-layout";

interface LikeNoItemsProps {
  
  available?:boolean,
  
}

const LikeNoItems = (props:LikeNoItemsProps) => {
  const {setPage} = useSetPage()
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
    <NoItemsLayout title={'В заказах пусто'} available={props.available}>
      {!session.exists && <Typography fontSize={'small'}>Войдите в <Button variant={'text'} size={'small'} onClick={callbacks.onProfileClick}><Typography textTransform={'capitalize'} fontSize={'small'} lineHeight={'10px'}>профиль</Typography></Button>, чтобы иметь возможность оформлять заказы</Typography>}
    </NoItemsLayout>
  )
};

export {LikeNoItems};