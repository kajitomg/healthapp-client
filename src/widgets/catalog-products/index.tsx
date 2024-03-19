import {Box, styled} from "@mui/material";
import {CatalogFilterController} from "../catalog-filter-controller";
import {CatalogSortController} from "../catalog-sort-controller";
import {CatalogProductsList} from "../catalog-products-list";
import {IProduct} from "../../entities/product/model/product-model.ts";

interface CatalogProductsProps {
  
  list?:IProduct[]
  
}

const StyledBox = styled('div')(({theme}) => ({
  paddingTop:16,
  display:'flex',
  justifyContent:'flex-start',
  alignItems:'flex-start',
  position:'relative',
  [theme.breakpoints.down('md')]:{
    flexDirection:'column'
  }
}))

const CatalogProducts = (props:CatalogProductsProps) => {

  if(props.list){
    return (
      <StyledBox>
        <CatalogFilterController list={props?.list}/>
        <Box width={'100%'} display={'flex'} justifyContent={'center'} flexDirection={'column'}>
          <Box>
            <CatalogSortController/>
          </Box>
          <CatalogProductsList list={props?.list}/>
        </Box>
      </StyledBox>
    );
  }
  return null
};

export {CatalogProducts};