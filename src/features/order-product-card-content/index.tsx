import Box from "@mui/material/Box";
import {ProductCardName} from "../product-card-name";

interface OrderProductCardContentProps {
  
  name?:string,
  
}

const OrderProductCardContent = (props:OrderProductCardContentProps) => {
  return (
    <Box>
      <ProductCardName name={props.name} fontSize={'small'}/>
    </Box>
  );
};

export {OrderProductCardContent};