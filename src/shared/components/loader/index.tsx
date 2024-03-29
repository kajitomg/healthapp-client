import {Box, CircularProgress} from "@mui/material";

const Loader = () => {
  return (
    <Box width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <CircularProgress />
    </Box>
  );
};

export {Loader};