import {Card, CardActions, CardContent, styled} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {ProductCardActions} from "../product-card-actions";
import {ProductCardContent} from "../product-card-content";
import {ProductCardMedia} from "../product-card-media";
import {useCallback} from "react";

interface ProductCardProps {
  
  item:IProduct,
  
  onClick?:(id:number) => void
  
}

const StyledCard = styled(Card)(({theme}) => ({
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
  const callbacks = {
    
    onClick:useCallback(() => {
      props.item?.id && props.onClick && props.onClick(props.item?.id)
    },[]),
    
  }
  return (
    <StyledCard onClick={() => callbacks.onClick()}>
      <ProductCardMedia images={props.item.images}/>
      <CardContent>
        <ProductCardContent name={props.item.name} description={props.item.description} article={props.item.article} count={props.item.count}/>
      </CardContent>
      <CardActions>
        <ProductCardActions discount={props.item.discount} price={props.item.price}/>
      </CardActions>
    </StyledCard>
  );
};

export {ProductCard};