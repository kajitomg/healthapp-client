import {Box, CssBaseline} from "@mui/material";
import {memo, useCallback} from "react";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {HeaderContent} from "../header-content";

interface HeaderProps {
  
  isOpen?:boolean
  
}


const Header = memo((props:HeaderProps) => {
  const {setPage} = usePage()
  
  const session = useTypedSelector(state => state.session)

  const callbacks = {
    
    setPage: useCallback((id:string) => {
      setPage(id)
    },[]),
    
  }
  
  return (
    <Box display={'flex'}>
      <CssBaseline/>
      <HeaderContent isBurgerOpen={props.isOpen} session={session} setPage={callbacks.setPage}/>
    </Box>
  );
});

export {Header};