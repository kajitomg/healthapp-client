import {Box, Typography} from "@mui/material";
import {ProductsList} from "../../widgets/products-list";
import {ProductsController} from "../../widgets/products-controller";
import mainImage  from '../../imgaes/main.jpg'
import {FullsizeImageLayout} from "../../shared/components/fullsize-image-layout";



const Products = () => {
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <FullsizeImageLayout image={mainImage} imageAlt={'Изображение'} height={300} isIndents={true}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <Typography fontSize={'xxx-large'} color={'whitesmoke'}>Продукты</Typography>
        </Box>
      </FullsizeImageLayout>
      <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} position={'relative'} paddingTop={2}>
        <ProductsController/>
        <ProductsList/>
      </Box>
    </Box>
  );
};

export {Products};