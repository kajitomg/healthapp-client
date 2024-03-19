import { CardContent, styled} from "@mui/material";
import {CatalogCategoriesCardMedia} from "../catalog-categories-card-media";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {CatalogCategoriesCardContent} from "../catalog-categories-card-content";
import {CategoryCard} from "../category-card";

interface CatalogCategoriesCardProps {
  
  item?:ICategory,
  
}

const StyledCard = styled(CategoryCard)(({theme}) => ({
  width: 'calc(25% - 16px)',
  [theme.breakpoints.down('lg')]:{
    width: 'calc(33.333% - 16px)'
  },
  [theme.breakpoints.down('md')]:{
    width: 'calc(50% - 16px)'
  },
  [theme.breakpoints.down('sm')]:{
    width: 'calc(100% - 16px)'
  },
}))

const CatalogCategoriesCard = (props:CatalogCategoriesCardProps) => {
  const {item} = props
  
  return (
    <StyledCard variant={'outlined'} catalogId={item?.id}>
      <CatalogCategoriesCardMedia/>
      <CardContent>
        <CatalogCategoriesCardContent name={item?.name}/>
      </CardContent>
    </StyledCard>
  );
};

export {CatalogCategoriesCard};