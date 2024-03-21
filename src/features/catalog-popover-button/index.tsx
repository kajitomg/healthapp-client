import {Button, useMediaQuery, useTheme} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {ButtonTypography} from "../../shared/components/button-typography";

interface CatalogPopoverButtonProps {
  onClick?:() => void
}

const CatalogPopoverButton = (props:CatalogPopoverButtonProps) => {
  const theme = useTheme()
  const isCatalogInSearch = useMediaQuery(theme.breakpoints.up('sm'))
  
  if(isCatalogInSearch){
    return (
      <Button variant="text" endIcon={<KeyboardArrowDownIcon />} sx={{ p: '10px' }} onClick={props.onClick}>
        <ButtonTypography>Каталог</ButtonTypography>
      </Button>
    );
  }
  return null
 
};

export {CatalogPopoverButton};