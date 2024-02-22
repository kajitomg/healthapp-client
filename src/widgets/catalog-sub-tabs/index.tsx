import {Box} from "@mui/material";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {CatalogSubTabsList} from "../../features/catalog-sub-tabs-list";

interface CatalogSubtabsProps {
  
  list?:ICategory[]
  
}

const CatalogSubTabs = (props:CatalogSubtabsProps) => {
  
  return (
    <Box>
      <CatalogSubTabsList list={props.list}/>
    </Box>
  );
};

export {CatalogSubTabs};