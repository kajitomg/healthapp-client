import {useCallback} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {AvailabledIconButton} from "../../shared/components/availabled-icon-button";

interface ProductButtonDelete {
  
  onClick?:() => void,
  
}

const ProductButtonDelete = (props:ProductButtonDelete) => {
  
  const callbacks = {
    onClick:useCallback(() => {
      props.onClick && props.onClick()
    },[props.onClick])
  }
  return (
    <AvailabledIconButton icon={<DeleteIcon/>} onClick={callbacks.onClick} size={'small'}/>
  );
};

export {ProductButtonDelete};