import {Button, Skeleton, Typography} from "@mui/material";
import {SessionState} from "../../entities/user/store/session/reducer.ts";

interface HeaderSessiondataButtonProps {
  session?:SessionState
}

const HeaderSessiondataButton = (props:HeaderSessiondataButtonProps) => {
  if(props.session?.waiting){
    return <Skeleton
      animation={"wave"}
      width={200}
      height={30}
    />
  } else if (props.session?.exists){
    return <Button sx={[
      {'&:hover':{
          backgroundColor:'transparent'
        }
      }]}>
      <Typography color={'gray'} textTransform={'none'}>{props.session.user?.email}</Typography>
    </Button>
  }
  return null
  
};

export {HeaderSessiondataButton};