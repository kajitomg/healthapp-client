import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {memo} from "react";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";


const HeaderHomepageIcon = memo(() => {
  const theme = useTheme()
  const isHeaderHomepageIconSmall = useMediaQuery(theme.breakpoints.down('sm'))
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Typography color={'crimson'} fontWeight={'bold'} fontSize={isHeaderHomepageIconSmall ? 'large' :'x-large'} textTransform={'uppercase'} lineHeight={1} noWrap>Alliance</Typography>
      <Typography color={'whitesmoke'} fontWeight={'lighter'} fontSize={isHeaderHomepageIconSmall ? 'x-small' :'small'} textTransform={'capitalize'} lineHeight={1} noWrap>health technologies</Typography>
    </Box>
  );
});

export {HeaderHomepageIcon};