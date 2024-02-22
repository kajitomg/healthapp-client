import {Box, Divider, Typography} from "@mui/material";
import {FooterLayout} from "../../features/footer-layout";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectIsPopSnapOpen} from "../../entities/pop-snap/store/pop-snap/reducer.ts";

interface FooterProps {
  
  drawerWidth:number
  
  isOpen:boolean
  
}

const Footer = (props:FooterProps) => {
  const isBottomNavigationAvailable = useTypedSelector(state => selectIsPopSnapOpen(state, 'bottom-navigation-available'))
  
  return (
    <Box>
      <Divider/>
      <FooterLayout drawerwidth={props.drawerWidth} open={props.isOpen}>
        <Box paddingTop={3}>
          <Typography>Copyright © 2024, Компания АльянсХелс</Typography>
        </Box>
      </FooterLayout>
      {isBottomNavigationAvailable && <Box height={'56px'}/>}
    </Box>
  );
};

export {Footer};