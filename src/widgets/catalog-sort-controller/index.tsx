import {Box} from "@mui/material";
import {CatalogSort} from "../../features/catalog-sort";

const CatalogSortController = () => {
  
  
  return (
    <Box
      sx={{backgroundColor:'white'}}
      borderRadius={1}
      m={1}
      boxShadow={theme => theme.shadows[1]}
    >
      <CatalogSort/>
  </Box>
);
};

export {CatalogSortController};