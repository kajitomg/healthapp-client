import Button from "@mui/material/Button";
import {ButtonProps} from "@mui/material";
import {ButtonTypography} from "../../shared/components/button-typography";

type CatalogManagerFilterButtonProps = {
  
  buttonText?:string
  
} & ButtonProps


const CatalogManagerFilterButton = (props:CatalogManagerFilterButtonProps) => {
  const {buttonText, ...defProps} = props
  
  return (
    <Button variant={'contained'} {...defProps}>
      <ButtonTypography>{buttonText}</ButtonTypography>
    </Button>
  );
};

export {CatalogManagerFilterButton};