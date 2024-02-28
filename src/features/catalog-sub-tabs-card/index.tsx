import {Card, CardContent, styled} from "@mui/material";
import {CatalogSubTabsCardMedia} from "../catalog-sub-tabs-card-media";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {CatalogSubTabsCardContent} from "../catalog-sub-tabs-card-content";
import {useCallback} from "react";

interface CatalogSubTabsCardProps {
  
  item?:ICategory,
  
  onClick?:(id:number) => void,
  
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

const CatalogSubTabsCard = (props:CatalogSubTabsCardProps) => {
  
  const callbacks = {
    
    onClick:useCallback(() => {
      props.item?.id && props.onClick && props.onClick(props.item?.id)
    },[]),
    
  }
  
  return (
    <StyledCard variant={'outlined'} onClick={callbacks.onClick}>
      <CatalogSubTabsCardMedia/>
      <CardContent>
        <CatalogSubTabsCardContent name={props.item?.name} />
      </CardContent>
    </StyledCard>
  );
};

export {CatalogSubTabsCard};