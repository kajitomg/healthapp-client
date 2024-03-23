import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ProductNoSpecification = () => {
  
  return (
    <Box width={'100%'} display={'flex'} justifyContent={'center'} my={2}>
      <Typography fontWeight={'bold'} fontSize={'small'}>Нет характеристик</Typography>
    </Box>
  );
};

export {ProductNoSpecification};