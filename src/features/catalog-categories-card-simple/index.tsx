import styled from "@mui/material/styles/styled";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {CatalogCategoriesCardContent} from "../catalog-categories-card-content";
import {CategoryCard} from "../category-card";

interface CatalogCategoriesCardProps {
  
  item?:ICategory,
  
}

const StyledCard = styled(CategoryCard)(() => ({
  width:'100%'
}))

const CatalogCategoriesCardSimple = (props:CatalogCategoriesCardProps) => {
  const {item} = props
  
  return (
    <StyledCard variant={'outlined'} catalogId={item?.id} sx={{
      flexDirection:'column',
      m:0.5
    }}>
      <CatalogCategoriesCardContent name={item?.name}/>
    </StyledCard>
  );
};

export {CatalogCategoriesCardSimple};