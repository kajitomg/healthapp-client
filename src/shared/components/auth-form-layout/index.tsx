import {Box, Typography} from "@mui/material";
import {FormEvent, ReactNode} from "react";

interface AuthFormLayoutProps {
  
  title?:string,
  
  children?:ReactNode,
  
  onSubmit?:(e: FormEvent<HTMLFormElement>) => void
  
  onReset?:(e: FormEvent<HTMLFormElement>) => void
  
}

const AuthFormLayout = (props:AuthFormLayoutProps) => {
  return (
    <Box
      bgcolor={'white'}
      borderRadius={1}
      boxShadow={theme => theme.shadows[1]}
      my={1}
      p={2}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      component={'form'}
      noValidate
      autoComplete="off"
      onSubmit={props.onSubmit}
      onReset={props.onReset}
      width={350}
    >
      <Box width={'100%'} my={2} px={1}>
        <Typography fontSize={'large'}>{props.title}</Typography>
      </Box>
      <Box width={'100%'}>
        {props.children}
      </Box>
    </Box>
  );
};

export {AuthFormLayout};