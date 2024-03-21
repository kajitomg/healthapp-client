import {Box, Typography} from "@mui/material";

const ProductNoDescription = () => {
  
  return (
    <Box width={'100%'} display={'flex'} justifyContent={'center'} my={2}>
      <Typography fontWeight={'bold'} fontSize={'small'}>Нет описания</Typography>
    </Box>
  );
};

export {ProductNoDescription};