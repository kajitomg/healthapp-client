import {useCallback} from "react";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {CardProps} from "@mui/material";
import {StyledCard} from "../../shared/components/styled-card";

type CategoryCardProps = {
  
  catalogId?:string | number
  
} & CardProps

const CategoryCard = (props:CategoryCardProps) => {
  const {catalogId, ...defProps} = props
  
  const {setPage,pages} = usePage()
  const {setParams} = useParams()
  
  const callbacks = {
    onClick:useCallback(() => {
      if(catalogId){
        setPage('catalog', catalogId.toString())
        setParams({},pages?.list?.find(page => page.id === 'catalog'))
      }
    },[setPage,setParams,pages,catalogId])
  }
  return (
    <StyledCard onClick={callbacks.onClick} {...defProps}>{props.children}</StyledCard>
  );
};

export {CategoryCard};