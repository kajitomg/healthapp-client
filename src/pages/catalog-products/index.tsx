import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import {CatalogManagerFilter} from "../../widgets/catalog-manager-filter";
import {CatalogManagerSort} from "../../widgets/catalog-manager-sort";
import {CatalogProductsList} from "../../widgets/catalog-products-list";
import {Pagination} from "../../shared/components/pagination";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";

interface CatalogProductsProps {
  
  onPageChange?:(page?:number) => void
  
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
  const catalog = useTypedSelector(state => state.catalog)
  
    return (
      <StyledBox>
        <CatalogManagerFilter/>
        <Box width={'100%'} display={'flex'} justifyContent={'center'} flexDirection={'column'}>
          <Box>
            <CatalogManagerSort/>
          </Box>
          <CatalogProductsList list={catalog.products?.list}/>
          {catalog.products?.count && catalog.products?.list?.length ? <Pagination count={catalog.products?.count} maxCount={10} onChange={props?.onPageChange}/> : null}
        </Box>
      </StyledBox>
    );
};

export {CatalogProducts};