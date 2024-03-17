import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {getProductCartCount} from "../../shared/utils/get-product-cart-count.ts";
import RemoveIcon from "@mui/icons-material/Remove";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {AvailabledIconButton} from "../../shared/components/availabled-icon-button";

interface ProductCounterProps {
  
  product?:IProduct,
  
  cartProps?:ReturnType<typeof useCart>
  
}

const ProductCounter = (props:ProductCounterProps) => {
  
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      borderRadius={5}
      onClick={(e) => e.stopPropagation()}
    >
      <AvailabledIconButton icon={<AddIcon/>} onClick={() => props.cartProps?.incrementProductInCart(props?.product)}/>
      <Typography>{getProductCartCount(props?.product)}</Typography>
      <AvailabledIconButton icon={<RemoveIcon/>} onClick={() => props.cartProps?.decrementProductInCart(props?.product)}/>
    </Box>
  );
};

export {ProductCounter};