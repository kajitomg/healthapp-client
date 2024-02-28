import React, {useContext} from 'react';
import {Typography} from "@mui/material";
import {TabPanel} from "../../shared/components/tab-panel";
import {ProductNavigationContext} from "../../pages/product";

interface ProductDescriptionProps {

  description?:string
  
}

const ProductDescription = (props:ProductDescriptionProps) => {
  const {productNavigationValue} = useContext(ProductNavigationContext)
  
  return (
    <TabPanel index={0} value={productNavigationValue}>
      <Typography>{props?.description}</Typography>
    </TabPanel>
  );
};

export {ProductDescription};