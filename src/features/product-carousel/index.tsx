import Carousel from "react-material-ui-carousel";
import config from "../../config.ts";
import {IImage} from "../../entities/image/model/image-model.ts";
import cardImage from "../../imgaes/card.jpg";
import {Box} from "@mui/material";

interface ProductCarouselProps {
  
  images?:IImage[]
  
}

const ProductCarousel = (props:ProductCarouselProps) => {

  if(props?.images?.length !== 0){
    return (
      <Box width={'500px'}>
        <Carousel height={'400px'} swipe autoPlay={false}>
          {props?.images?.map((image) =>
            <img
              key={image.id}
              alt={'Изображение товара'}
              src={config.api.baseUrl + '/' + image?.path}
              width={'100%'}
              height={'100%'}
              style={{
                objectFit: 'cover'
              }}
            />)}
        </Carousel>
      </Box>
    )
  }
  return (
      <Box height={'400px'} width={'500px'}>
        <img alt={'Базовое изображение товара'} src={cardImage} width={'100%'} height={'100%'} style={{
          objectFit: 'cover'
        }}/>
      </Box>
    );
};

export {ProductCarousel};