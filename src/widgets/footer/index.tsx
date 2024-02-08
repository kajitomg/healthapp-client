import {Box, Divider, Typography} from "@mui/material";
import {FooterLayout} from "../../features/footer-layout";

interface FooterProps {
  
  drawerWidth:number
  
  isOpen:boolean
  
}

const Footer = (props:FooterProps) => {
  return (
    <Box>
      <FooterLayout drawerwidth={props.drawerWidth} open={props.isOpen}>
        <Divider/>
        <Box paddingTop={3}>
          <Typography>Copyright © 2024, Компания АльянсХелс</Typography>
        </Box>
      </FooterLayout>
    </Box>
  );
};

export {Footer};