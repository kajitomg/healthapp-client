import {Box, styled} from "@mui/material";
import {CatalogFilterController} from "../catalog-filter-controller";
import {CatalogSortController} from "../catalog-sort-controller";
import {ProductsList} from "../products-list";
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
        <Box width={'100%'} display={'flex'} justifyContent={'center'} flexDirection={'column'} marginTop={1}>
          <Box>
            <CatalogSortController/>
          </Box>
          <ProductsList list={props?.list}/>
        </Box>
      </StyledBox>
    );
  }
  return null
};

export {CatalogProducts};