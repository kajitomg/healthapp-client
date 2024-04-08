import CardContent from "@mui/material/CardContent";
import {CatalogCategoriesCardMedia} from "../catalog-categories-card-media";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {CatalogCategoriesCardContent} from "../catalog-categories-card-content";
import {CategoryCard} from "../category-card";

interface CatalogCategoriesCardProps {
  
  item?:ICategory,
  
}

const CatalogCategoriesCard = (props:CatalogCategoriesCardProps) => {
  const {item} = props
  
  return (
    <CategoryCard variant={'outlined'} catalogId={item?.id} sx={{
      flexDirection:'column'
    }}>
      <CatalogCategoriesCardMedia/>
      <CardContent>
        <CatalogCategoriesCardContent name={item?.name}/>
      </CardContent>
    </CategoryCard>
  );
};

export {CatalogCategoriesCard};