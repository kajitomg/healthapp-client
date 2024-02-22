import {Box, CssBaseline} from "@mui/material";
import {Burger} from "../burger";
import {useCallback} from "react";
import {useBurger} from "../burger/hooks.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectIsPopSnapOpen} from "../../entities/pop-snap/store/pop-snap/reducer.ts";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {HeaderContent} from "../header-content";


const Header = () => {
  const {setPage} = useSetPage()
  
  const { name} = useBurger()
  
  const session = useTypedSelector(state => state.session)
  const isOpen = useTypedSelector(state => selectIsPopSnapOpen(state,name))

  const callbacks = {
    
    setPage: useCallback((id:string) => {
      setPage(id)
    },[]),
    
  }
  /*
   toggleMenu: useCallback(() => {
      if(isOpen){
        popSnap.close({id:name})
      }else {
        popSnap.open({id:name})
      }
    },[isOpen]),
  */
  
  return (
    <Box display={'flex'}>
      <CssBaseline/>
      <HeaderContent session={session} setPage={callbacks.setPage}/>
      <Burger setPage={callbacks.setPage} isOpen={isOpen}/>
    </Box>
  );
};

export {Header};