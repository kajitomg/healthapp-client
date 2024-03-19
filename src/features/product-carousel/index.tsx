import Carousel from "react-material-ui-carousel";
import config from "../../config.ts";
import {IImage} from "../../entities/image/model/image-model.ts";
import cardImage from "../../imgaes/card.jpg";
import {Box} from "@mui/material";
import {ProgressiveImageLoader} from "../../shared/components/progressive-image-loader";

interface ProductCarouselProps {
  
  images?:IImage[]
  
}

const ProductCarousel = (props:ProductCarouselProps) => {

  if(props?.images?.length !== 0){
    return (
      <Box width={'500px'}>
        <Carousel height={'400px'} swipe autoPlay={false} animation={'slide'}>
          {props?.images?.map((image) =>
            <Box width={'500px'} height={'400px'} key={image.id}>
              <ProgressiveImageLoader
                alt={'Изображение товара'}
                progressiveSrc={config.api.baseUrl + '/' + image?.path}
                src={config.api.baseUrl + '/' + image?.path}
                width={'100%'}
                height={'100%'}
                style={{
                  objectFit: 'cover'
                }}
              />
            </Box>
          )}
        </Carousel>
      </Box>
    )
  }
  return (
      <Box height={'400px'} width={'500px'}>
        <ProgressiveImageLoader
          alt={'Базовое изображение товара'}
          progressiveSrc={cardImage}
          src={cardImage}
          width={'100%'}
          height={'100%'}
          style={{
            objectFit: 'cover'
          }}
        />
      </Box>
    );
};

export {ProductCarousel};