import {Box, Typography} from "@mui/material";

interface ProductCardContentProps {
  
  name?:string,
  
  description?:string,
  
  article?:string,
  
  count?:number
  
}

const ProductCardContent = (props:ProductCardContentProps) => {
  return (
    <Box>
      <Typography gutterBottom variant="h5" component="div">
        {props?.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {props?.description}
      </Typography>
      <Box display={'flex'} justifyContent={'space-between'} >
        <Typography variant="caption" color={'black'}>
          осталось: {props?.count}
        </Typography>
        <Typography variant="caption" color={'black'}>
          артикул: {props?.article}
        </Typography>
      </Box>
    </Box>
  );
};

export {ProductCardContent};