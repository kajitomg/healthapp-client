import React from 'react';
import {Button} from "@mui/material";

interface ProductButtonBuyProps {

}

const ProductButtonBuy = (props:ProductButtonBuyProps) => {
  return (
    <Button variant={'contained'} color={'primary'}>Купить</Button>
  );
};

export {ProductButtonBuy};