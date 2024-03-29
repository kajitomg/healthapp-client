import {Box, Divider, Typography} from "@mui/material";
import {FooterLayout} from "../../shared/components/footer-layout";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectIsPopSnapOpen} from "../../entities/pop-snap/store/pop-snap/reducer.ts";
import {FooterContacts} from "../../features/footer-contacts";
import {memo} from "react";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

interface FooterProps {
  
  drawerWidth:number | string
  
  isOpen:boolean
  
}

const Footer = memo((props:FooterProps) => {
  const isBottomNavigationAvailable = useTypedSelector(state => selectIsPopSnapOpen(state, 'bottom-navigation-available'))
  const theme = useTheme()
  const isMediaQuerySm = useMediaQuery(theme.breakpoints.down('sm'))
  
  return (
    <Box  bgcolor={'white'} borderRadius={1}>
      <Divider/>
      <FooterLayout drawerwidth={props.drawerWidth} open={props.isOpen}>
        <Box display={'flex'} justifyContent={'flex-end'}>
          <FooterContacts sx={{flex:`0 1 ${isMediaQuerySm ? '100%' :'33.333%'}`}}/>
        </Box>
        <Divider/>
        <Box paddingTop={3}>
          <Typography fontSize={'small'}>Copyright © 2024, Компания АльянсХелс</Typography>
        </Box>
      </FooterLayout>
      {isBottomNavigationAvailable && <Box height={'56px'}/>}
    </Box>
  );
});

export {Footer};