import {Box, Button, Typography} from "@mui/material";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {useCallback} from "react";

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
  
  if(props.available){
    return (
      <Box minHeight={'350px'} display={'flex'} justifyContent={'center'} alignItems={'center'} bgcolor={'white'} borderRadius={1} boxShadow={(theme) => theme.shadows[1]}>
        <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
          <Typography fontSize={'medium'} fontWeight={'bolder'} my={1}>В заказах пусто</Typography>
          {!session.exists && <Typography fontSize={'small'}>Войдите в <Button variant={'text'} size={'small'} onClick={callbacks.onProfileClick}><Typography textTransform={'capitalize'} fontSize={'small'} lineHeight={'10px'}>профиль</Typography></Button>, чтобы иметь возможность оформлять заказы</Typography>}
        </Box>
      </Box>
    );
  }
  return null
};

export {LikeNoItems};