import {Box, Typography} from "@mui/material";

interface ProductPriceProps {
  
  price?:number,
  
  discount?:number
  
}

const ProductPrice = (props:ProductPriceProps) => {
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      {props.price &&
        <Typography
          fontSize={props.discount && 'x-small'}
          variant={"subtitle1"}
          color={props.discount ? 'crimson' : 'black'}
          sx={{
            textDecoration:props.discount &&'line-through'
          }}
        >{Intl.NumberFormat('ru',{style: 'currency', currency: 'RUB'}).format(props.price)}</Typography>
      }
      {props.discount &&
        <Typography variant={"subtitle1"} color={props.price ? 'forestgreen' : 'black'}>{Intl.NumberFormat('ru',{style: 'currency', currency: 'RUB'}).format(props.discount)}</Typography>
      }
      {!props.price && !props.discount &&
        <Typography variant={"subtitle1"} color={'black'}>Цена не указана</Typography>
      }
    </Box>
  );
};

export {ProductPrice};