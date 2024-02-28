import {Box} from "@mui/material";
import {ProductNavigationsTabs} from "../../features/product-navigation-tabs";
import {useState} from "react";

export interface ProductNavigationTabs {label:string}

const ProductNavigation = () => {
  const [tabs] = useState<ProductNavigationTabs[]>([{label:'Описание'},{label:'Характеристики'}])
  
  return (
    <Box borderRadius={1} boxShadow={theme => theme.shadows[1]} width={'200px'}>
      <ProductNavigationsTabs list={tabs}/>
    </Box>
  );
};

export {ProductNavigation};