import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {AvailabledIconButton} from "../../shared/components/availabled-icon-button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useCallback} from "react";

interface ProductButtonLikeProps {
  
  onClick?:() => void,
  
  onClickAvailable?:() => void,
  
  isAvailable?:boolean
  
}

const ProductButtonLike = (props:ProductButtonLikeProps) => {

  const callbacks = {
    onClick:useCallback(() => {
      props.isAvailable && props.onClickAvailable && props.onClickAvailable()
      !props.isAvailable && props.onClick && props.onClick()
    },[props])
  }
  
  return (
    <AvailabledIconButton available={props.isAvailable} onClick={callbacks.onClick} icon={<FavoriteBorderIcon/>} availabledIcon={<FavoriteIcon/>} size={'small'}/>
  );
};

export {ProductButtonLike};