import {useTheme} from "@mui/material";
import {ManagerStickyLayout} from "../../shared/components/manager-layout-sticky";
import {CatalogManagerFilterList} from "../../features/catalog-manager-filter-list";
import {memo} from "react";

const CatalogManagerFilter = memo(() => {
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
      <CatalogManagerFilterList/>
    </ManagerStickyLayout>
  );
});

export {CatalogManagerFilter};