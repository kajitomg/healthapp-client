import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import cardImage from "../../imgaes/card.jpg";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {ProductPrice} from "../product-price";
import config from "../../config.ts";

interface ProductCardProps {
  item:IProduct
}

const ProductCard = (props:ProductCardProps) => {
  
  return (
    <Card sx={{ width: 'calc(25% - 16px)' }} onClick={() => {console.log('da')}} style={{cursor:'pointer',margin: 8}}>
      <CardMedia
        component="img"
        alt="Изображение товара"
        height="300px"
        src={props.item.images?.[0] ? config.api.baseUrl + '/' + props.item.images?.[0]?.path : cardImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.item?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.item?.description}
        </Typography>
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Typography variant="caption" color={'black'}>
            артикул: {props.item?.article}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} minHeight={'46px'} paddingX={1}>
          <Button size="small" variant={"contained"} onClick={(e) => {e.stopPropagation();console.log('da1')}}>Купить</Button>
          <ProductPrice price={props.item.price} discount={props.item.discount}/>
        </Box>
      </CardActions>
    </Card>
  );
};

export {ProductCard};