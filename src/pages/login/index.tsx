import {LoginForm} from "../../widgets/login-form";
import {Box} from "@mui/material";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {FullheightContentLayout} from "../../shared/components/fullheight-content-layout";

const Login = () => {
  return (
    <Box>
      <MainContentLayout>
        <FullheightContentLayout sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <LoginForm/>
        </FullheightContentLayout>
      </MainContentLayout>
    </Box>
  );
};

export default Login;