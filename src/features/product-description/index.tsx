import {Box, Typography} from "@mui/material";

interface ProductDescriptionProps {

  description?:string
  
}

const ProductDescription = (props:ProductDescriptionProps) => {

  return (
    <Box display={'flex'} flexDirection={'column'} width={'100%'} >
      <Box my={2} mb={3}>
        <Typography fontWeight={'bold'} fontSize={'x-large'}>Описание</Typography>
      </Box>
      <Typography>{props?.description}</Typography>
    </Box>
  );
};

export {ProductDescription};