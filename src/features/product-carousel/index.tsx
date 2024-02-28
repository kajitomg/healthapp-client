import Carousel from "react-material-ui-carousel";
import config from "../../config.ts";
import {IImage} from "../../entities/image/model/image-model.ts";

interface ProductCarouselProps {
  
  images?:IImage[]
  
}

const ProductCarousel = (props:ProductCarouselProps) => {
  return (
    <Carousel height={'400px'} swipe autoPlay={false}>
      {props?.images?.map((image) =>
        <img key={image.id} alt={'Изображение товара'} src={config.api.baseUrl + '/' + image?.path} width={'100%'} height={'100%'} style={{
          objectFit:'cover'
        }}/>
      )}
    </Carousel>
  );
};

export {ProductCarousel};