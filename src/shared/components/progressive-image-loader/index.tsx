import {ImgHTMLAttributes, useEffect, useState} from "react";

interface ProgressiveImageLoaderProps extends ImgHTMLAttributes<HTMLImageElement>{
  
  src:string,
  
  progressiveSrc?:string
  
}

const ProgressiveImageLoader = (props:ProgressiveImageLoaderProps) => {
  const {progressiveSrc, ...defProps} = props
  const [imageSrc,setImageSrc] = useState(progressiveSrc)
  
  
  
  useEffect(() => {
    const image = new Image()
    image.src = props.src
    image.onload = () => {
      setImageSrc(props.src)
    }
  },[props.src])

  return (
    <img {...defProps} alt={props.alt} src={imageSrc} style={{
      filter:'blur(30px)',
      ...(props.src === imageSrc && {
        filter:'blur(0)',
        transition:'filter 0.3s linear'
      }),
      ...props.style
    }}/>
  );
};

export {ProgressiveImageLoader};