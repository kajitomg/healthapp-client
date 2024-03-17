import {useTheme} from "@mui/material";
import {CatalogFilter} from "../../features/catalog-filter";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {StickyLayout} from "../../shared/components/sticky-layout";

interface CatalogFilterControllerProps {
  
  list:IProduct[]
  
}

const CatalogFilterController = (props:CatalogFilterControllerProps) => {
  const theme = useTheme()
  
  return (
    <StickyLayout sx={{
      flex:'0 1 250px',
      minWidth:'250px',
      minHeight:'500px',
      margin:1,
      [theme.breakpoints.down('md')]:{
        top:`auto`,
        position:'relative',
        minHeight:'auto',
        height:'60px',
        flex:'1 1 100%',
        width:`calc(100% - ${theme.spacing(2)})`
      }
    }}>
      <CatalogFilter list={props.list}/>
    </StickyLayout>
  );
};

export {CatalogFilterController};