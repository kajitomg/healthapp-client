import {FullsizeImageLayout, FullsizeImageLayoutProps} from "../fullsize-image-layout";
import {Box} from "@mui/material";
import {PageImageTitle} from "../page-image-title";
import {ReactNode} from "react";

interface PageImageLayoutProps extends FullsizeImageLayoutProps {
  
  image:string,
  
  progressiveImage?:string,

  imageAlt:string,
  
  title?:string,
  
  children?:ReactNode
}

const PageImageLayout = (props:PageImageLayoutProps) => {
  return (
    <FullsizeImageLayout height={200} isIndents={true} {...props}>
      <Box maxWidth={'1200px'} height={'100%'} display={'flex'} flexDirection={'column'} margin={'0 auto'}>
        <Box width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <PageImageTitle>{props.title}</PageImageTitle>
        </Box>
        {props.children}
      </Box>
    </FullsizeImageLayout>
  );
};

export {PageImageLayout};