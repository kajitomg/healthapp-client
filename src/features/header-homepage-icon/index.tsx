import {Box, Typography} from "@mui/material";

const HeaderHomepageIcon = () => {
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Typography color={'crimson'} fontWeight={'bold'} fontSize={'x-large'} textTransform={'uppercase'} lineHeight={1} noWrap>Alliance</Typography>
      <Typography color={'whitesmoke'} fontWeight={'lighter'} fontSize={'small'} textTransform={'capitalize'} lineHeight={1} noWrap>health technologies</Typography>
    </Box>
  );
};

export {HeaderHomepageIcon};