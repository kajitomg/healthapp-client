import {Box, Typography} from "@mui/material";

interface CatalogSubTabsCardContentProps {
  
  name?:string,
  
}

const CatalogSubTabsCardContent = (props:CatalogSubTabsCardContentProps) => {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Typography gutterBottom variant="h5" component="div">
        {props?.name}
      </Typography>
    </Box>
  );
};

export {CatalogSubTabsCardContent};