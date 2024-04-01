import {IImage} from "../../entities/image/model/image-model.ts";
import {ProductCardMediaX} from "../product-card-media-x";
import useTheme from "@mui/material/styles/useTheme";

interface LikeProductCardMediaProps {

  images?:IImage[]
  
}

const LikeProductCardMedia = (props:LikeProductCardMediaProps) => {
  const theme = useTheme()
  
  return (
    <ProductCardMediaX image={props.images?.[0]} sx={{
      width:'160px',
      height:'160px',
      objectFit:'cover',
      maxHeight:'200px',
      maxWidth:'200px',
      '@container (max-width: 562px)': {
        width:'100%',
        height:'300px',
        objectFit:'cover',
        maxHeight:'none',
        maxWidth:'100%'
      },
      [theme.breakpoints.down('sm')]: {
        width:'100%',
        height:'300px',
        objectFit:'cover',
        maxHeight:'none',
        maxWidth:'100%'
      },
    }}/>
  );
};

export {LikeProductCardMedia};