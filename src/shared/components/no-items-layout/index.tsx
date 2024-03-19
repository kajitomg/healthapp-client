import {Box, Card, CardContent, Typography} from "@mui/material";
import {ReactNode} from "react";

interface NoItemsLayoutProps {
  
  title?:string,
  
  available?:boolean,
  
  children?:ReactNode
  
}

const NoItemsLayout = (props:NoItemsLayoutProps) => {
  if(props.available){
    return (
      <Card sx={{
        display:'flex',
        minHeight:'350px',
        justifyContent:'center',
        alignItems:'center',
      }}>
        <CardContent sx={{
          display:'flex',
          alignItems:'center',
          flexDirection:'column'
        }}>
          <Box>
            <Typography fontSize={'medium'} fontWeight={'bolder'} my={1}>{props.title}</Typography>
          </Box>
          {props.children}
        </CardContent>
      </Card>
    );
  }
  return null
};

export {NoItemsLayout};