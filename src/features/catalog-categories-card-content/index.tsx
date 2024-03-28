import Box from "@mui/material/Box";
import {CategoryCardName} from "../category-card-name";
import useTheme from "@mui/material/styles/useTheme";

interface CatalogCategoriesCardContentProps {
  
  name?:string,
  
}

const CatalogCategoriesCardContent = (props:CatalogCategoriesCardContentProps) => {
  const theme = useTheme()
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <CategoryCardName name={props.name} sx={{
        [theme.breakpoints.down('sm')]: {
          fontSize:'16px',
          p:1,
        },
      }}/>
    </Box>
  );
};

export {CatalogCategoriesCardContent};