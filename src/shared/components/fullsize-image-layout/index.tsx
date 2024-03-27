import {Box, SxProps, Theme} from "@mui/material";
import {memo, ReactNode} from "react";
import {useBurger} from "../../../widgets/burger/hooks.ts";
import {ProgressiveImageLoader} from "../progressive-image-loader";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

export interface FullsizeImageLayoutProps {
  
  isIndents?:boolean
  
  image:string
  
  progressiveImage?:string
  
  height?:number
  
  imageAlt?:string
  
  children?:ReactNode
  
  sx?:SxProps<Theme> | undefined
  
}

const FullsizeImageLayout = memo((props:FullsizeImageLayoutProps) => {
  const theme = useTheme()
  const isMediaQuerySm = useMediaQuery(theme.breakpoints.down('sm'))
  const {headerHeight} = useBurger()
  return (
    <Box position={'relative'} sx={{
      width:'100%',
      height:props.isIndents ? (props.height ? `calc(${props.height}px)` :`calc(100vh - ${headerHeight}px - 24px)`) : (props.height ? `${props.height}px` :'100vh')
    }}>
      <Box position={'absolute'} sx={{
        backgroundColor: 'rgba(0,0,0,.7)',
        backgroundBlendMode: 'multiply',
        margin:props.isIndents ? '-88px -24px' : '0 -24px',
        top:0,
        left:0,
        width:`calc(100% + ${isMediaQuerySm? '32px' :'48px'})`,
        height:props.height ? `calc(100% + ${props.isIndents ? headerHeight : 0}px + ${props.isIndents ? 24 : 0}px + ${isMediaQuerySm ? 16 :0}px)` : '100vh'
      }}>
        <ProgressiveImageLoader
          alt={props.imageAlt}
          src={props.image}
          progressiveSrc={props.progressiveImage}
          width={'100%'}
          height={'100%'}
          style={{objectFit:'cover',opacity:0.5}}
        />
      </Box>
      <Box position={'relative'} sx={{
        height:'100%',
        ...props.sx,
      }}>
        {props.children}
      </Box>
    </Box>
  );
});

export {FullsizeImageLayout};