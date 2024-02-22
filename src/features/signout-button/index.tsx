import {Button} from "@mui/material";

interface SignoutButtonProps {
  onClick:() => void,
  isAvailable?:boolean
}

const SignoutButton = (props:SignoutButtonProps) => {
  if(!props.isAvailable){
    return null
  } else {
    return <Button type={'button'} variant={'outlined'} size={'small'} color={'error'} onClick={props.onClick} title={'Выйти из аккаунта'}>Выйти</Button>
  }
};

export {SignoutButton};