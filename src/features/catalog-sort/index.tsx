import {Box} from "@mui/material";
import {CatalogSortSelectForm} from "../catalog-sort-select-form";


/*
  Сортировка по (цена, наличие)..., выбор нескольких категорий
 */
const CatalogSort = () => {

  return (
    <Box width={'100%'} display={'flex'} alignItems={'center'} p={1}>
      <CatalogSortSelectForm/>
    </Box>
  );
};

export {CatalogSort};