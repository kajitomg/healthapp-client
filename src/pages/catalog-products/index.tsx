import {IProduct} from "../../entities/product/model/product-model.ts";
import {Box, styled} from "@mui/material";
import {CatalogManagerFilter} from "../../widgets/catalog-manager-filter";
import {CatalogManagerSort} from "../../widgets/catalog-manager-sort";
import {CatalogProductsList} from "../../widgets/catalog-products-list";

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
        <CatalogManagerFilter list={props?.list}/>
        <Box width={'100%'} display={'flex'} justifyContent={'center'} flexDirection={'column'}>
          <Box>
            <CatalogManagerSort/>
          </Box>
          <CatalogProductsList list={props?.list}/>
        </Box>
      </StyledBox>
    );
  }
  return null
};

export {CatalogProducts};