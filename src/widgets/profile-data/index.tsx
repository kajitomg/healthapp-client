import {Box} from "@mui/material";

const ProfileData = () => {
  return (
    <Box
      bgcolor={'white'}
      borderRadius={1}
      boxShadow={theme => theme.shadows[1]}
      my={1}
      p={1}
      display={'flex'}
      justifyContent={'flex-start'}
    >
      <Box width={350}>
      </Box>
    </Box>
  );
};

export {ProfileData};