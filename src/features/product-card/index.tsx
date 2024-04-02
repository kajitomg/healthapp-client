import {useCallback} from "react";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {CardProps} from "@mui/material";
import {StyledCard} from "../../shared/components/styled-card";

type ProductCardProps = {
  
  productId?:string | number
  
} & CardProps

const ProductCard = (props:ProductCardProps) => {
  const {productId, ...defProps} = props
  
  const {setPage,pages} = usePage()
  const {setParams} = useParams()
  
  const callbacks = {
    onClick:useCallback(() => {
      if(productId){
        setPage('product',productId.toString())
        //setParams({},pages?.list?.find(page => page.id === 'product'))
      }
    },[setPage,setParams,pages,productId])
  }
  return (
    <StyledCard onClick={callbacks.onClick} {...defProps}>{props.children}</StyledCard>
  );
};

export {ProductCard};