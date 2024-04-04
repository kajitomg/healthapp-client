import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import {CatalogManagerFilter} from "../../widgets/catalog-manager-filter";
import {CatalogManagerSort} from "../../widgets/catalog-manager-sort";
import {CatalogProductsList} from "../../widgets/catalog-products-list";
import {Pagination} from "../../shared/components/pagination";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {useCallback} from "react";
import {ParamsType} from "../../shared/models";

interface CatalogProductsProps {
  
  onPageChange?:(page?:number,params?:ParamsType | null) => void
  
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
  const {page} = usePage()
  const {params} = useParams({page})
  
  const callbacks = {
    onPageChange:useCallback((page?:number) => {
      props.onPageChange && props.onPageChange(page,params)
    },[props.onPageChange,params])
  }
  
    return (
      <StyledBox>
        <CatalogManagerFilter/>
        <Box width={'100%'} display={'flex'} justifyContent={'center'} flexDirection={'column'}>
          <Box>
            <CatalogManagerSort/>
          </Box>
          <CatalogProductsList list={catalog.products?.list}/>
          {catalog.products?.count && catalog.products?.list?.length ? <Pagination count={catalog.products?.count} maxCount={10} onChange={callbacks?.onPageChange}/> : null}
        </Box>
      </StyledBox>
    );
};

export {CatalogProducts};