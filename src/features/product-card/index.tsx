import {Card, CardActions, CardContent, styled} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {ProductCardActions} from "../product-card-actions";
import {ProductCardContent} from "../product-card-content";
import {ProductCardMedia} from "../product-card-media";

interface ProductCardProps {
  item:IProduct
}

const StyledCard = styled('div')(({theme}) => ({
  width: 'calc(25% - 16px)',
  cursor:'pointer',
  margin: 8,
  [theme.breakpoints.down('lg')]:{
    width: 'calc(33.333% - 16px)'
  },
  [theme.breakpoints.down('md')]:{
    width: 'calc(50% - 16px)'
  },
  [theme.breakpoints.down('sm')]:{
    width: 'calc(100% - 16px)'
  },
}))



const ProductCard = (props:ProductCardProps) => {
  
  return (
    <StyledCard>
      <Card onClick={() => {console.log('da')}}>
        <ProductCardMedia images={props.item.images}/>
        <CardContent>
          <ProductCardContent name={props.item.name} description={props.item.description} article={props.item.article} count={props.item.count}/>
        </CardContent>
        <CardActions>
          <ProductCardActions discount={props.item.discount} price={props.item.price}/>
        </CardActions>
      </Card>
    </StyledCard>
  );
};

export {ProductCard};