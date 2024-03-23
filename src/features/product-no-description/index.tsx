import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ProductNoDescription = () => {
  
  return (
    <Box width={'100%'} display={'flex'} justifyContent={'center'} my={2}>
      <Typography fontWeight={'bold'} fontSize={'small'}>Нет описания</Typography>
    </Box>
  );
};

export {ProductNoDescription};