import {Typography} from "@mui/material";
import {ProductNavigationItemLayout} from "../../shared/components/product-navigation-item-layout";
import {ProductNoDescription} from "../product-no-description";

interface ProductDescriptionProps {

  description?:string
  
}

const ProductDescription = (props:ProductDescriptionProps) => {

  return (
    <ProductNavigationItemLayout title={'Описание'}>
      {props?.description &&
        <Typography>{props?.description}</Typography>
      }
      {!props?.description &&
        <ProductNoDescription/>
      }
    </ProductNavigationItemLayout>
  );
};

export {ProductDescription};