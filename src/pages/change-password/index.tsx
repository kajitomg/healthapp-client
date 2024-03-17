import {Box} from "@mui/material";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {FullheightContentLayout} from "../../shared/components/fullheight-content-layout";
import {ProfileFormPassword} from "../../features/profile-form-field-password";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";

const ChangePassword = () => {
  const session = useTypedSelector(state => state.session)
  
  return (
    <Box>
      <MainContentLayout>
        <FullheightContentLayout sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <ProfileFormPassword user={session.user}/>
        </FullheightContentLayout>
      </MainContentLayout>
    </Box>
  );
};

export {ChangePassword};