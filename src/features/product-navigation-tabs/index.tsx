import React, {useCallback, useContext} from 'react';
import {Tab, Tabs} from "@mui/material";
import {ProductNavigationTabs} from "../../widgets/product-navigation";
import {ProductNavigationContext} from "../../pages/product";

interface ProductNavigationsTabsProps {

  list?:ProductNavigationTabs[],
  
}

const ProductNavigationsTabs = (props:ProductNavigationsTabsProps) => {
  const {productNavigationValue,setProductNavigationValue} = useContext(ProductNavigationContext)
  
  
  const callbacks = {
    onChange:useCallback((event: React.SyntheticEvent, newValue: number) => {
      setProductNavigationValue && setProductNavigationValue(newValue);
    },[])
  }
  
  return (
    <Tabs
      variant={'fullWidth'}
      orientation="vertical"
      aria-label='Вертикальный таб'
      value={productNavigationValue}
      onChange={callbacks.onChange}
      sx={{
        borderRight: 1,
        borderColor: 'divider'
      }}
    >
      {props.list?.map((item:ProductNavigationTabs) =>
        <Tab label={item?.label} key={item.label} sx={{textTransform:'capitalize'}}/>
      )}
    </Tabs>
  );
};

export {ProductNavigationsTabs};