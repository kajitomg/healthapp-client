import {useTheme} from "@mui/material";

import {IProduct} from "../../entities/product/model/product-model.ts";
import {ManagerStickyLayout} from "../../shared/components/manager-layout-sticky";
import {CatalogManagerFilterList} from "../../features/catalog-manager-filter-list";

interface CatalogFilterControllerProps {
  
  list:IProduct[]
  
}

const CatalogManagerFilter = (props:CatalogFilterControllerProps) => {
  const theme = useTheme()
  
  return (
    <ManagerStickyLayout sx={{
      p:0,
      minHeight:'500px',
      [theme.breakpoints.down('md')]:{
        top:`auto`,
        position:'relative',
        minHeight:'auto',
        height:'60px',
        flex:'1 1 100%',
        width:`calc(100% - ${theme.spacing(2)})`
      }
    }}>
      <CatalogManagerFilterList list={props.list}/>
    </ManagerStickyLayout>
  );
};

export {CatalogManagerFilter};