import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {memo} from "react";

const HeaderHomepageIcon = memo(() => {
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Typography color={'crimson'} fontWeight={'bold'} fontSize={'x-large'} textTransform={'uppercase'} lineHeight={1} noWrap>Alliance</Typography>
      <Typography color={'whitesmoke'} fontWeight={'lighter'} fontSize={'small'} textTransform={'capitalize'} lineHeight={1} noWrap>health technologies</Typography>
    </Box>
  );
});

export {HeaderHomepageIcon};