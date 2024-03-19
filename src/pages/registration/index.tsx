import {RegistrationForm} from "../../widgets/registration-form";
import {Box} from "@mui/material";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {FullheightContentLayout} from "../../shared/components/fullheight-content-layout";

const Registration = () => {
  return (
    
    <Box>
      <MainContentLayout>
        <FullheightContentLayout sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <RegistrationForm/>
        </FullheightContentLayout>
      </MainContentLayout>
    </Box>
  );
};

export default Registration;