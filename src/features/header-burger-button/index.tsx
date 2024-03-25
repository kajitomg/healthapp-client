import {memo, useCallback} from 'react';
import IconButton from "@mui/material/IconButton";
import {useActions} from "../../shared/services/redux/hooks/use-actions.ts";
import {useBurger} from "../../widgets/burger/hooks.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectIsPopSnapOpen} from "../../entities/pop-snap/store/pop-snap/reducer.ts";
import {Menu as MenuIcon} from "@mui/icons-material";
import {blue} from "@mui/material/colors";

interface HeaderBurgerButtonProps {
  isAvailable?:boolean
}

const HeaderBurgerButton = memo((props:HeaderBurgerButtonProps) => {
  const {popSnap} = useActions()
  
  const {name} = useBurger()
  
  const isOpen = useTypedSelector(state => selectIsPopSnapOpen(state,name))
  
  const callbacks = {
    toggleMenu: useCallback(() => {
      if (isOpen) {
        popSnap.close({id: name})
      } else {
        popSnap.open({id: name})
      }
    }, [isOpen]),
  }
  
  if(props.isAvailable){
    return (
      <IconButton
        onClick={callbacks.toggleMenu}
        edge="start"
      >
        <MenuIcon sx={{color:blue[50]}}/>
      </IconButton>
    );
  }
  return null
});

export {HeaderBurgerButton};