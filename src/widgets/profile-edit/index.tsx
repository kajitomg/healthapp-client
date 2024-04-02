import {Box, Button, Typography} from "@mui/material"
import {ProfileFormPhonenumber} from "../../features/profile-form-phonenumber";
import {ProfileFormName} from "../../features/profile-form-name";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {ProfileFormEmail} from "../../features/profile-form-email";
import {useCallback} from "react";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

const ProfieEdit = () => {
  const session = useTypedSelector(state => state.session)
  const {setPage,pages} = usePage()
  const {setParams} = useParams()
  const theme = useTheme()
  const isMediaQuerySm = useMediaQuery(theme.breakpoints.down('sm'))
  
  const callbacks = {
    
    onChangePassword:useCallback(() => {
      setPage('changePassword')
      setParams({},pages?.list?.find(page => page.id === 'changePassword'))
    },[setParams,pages]),
    
  }
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
      <Box width={isMediaQuerySm ? '100%' :350}>
        <ProfileFormPhonenumber user={session.user}/>
        <ProfileFormEmail user={session.user}/>
        {/*<FormField type={'firstname'} value={data.firstname} name={'firstname'} label={'Имя'} setData={setData}/>
        <FormField type={'lastname'} value={data.lastname} name={'lastname'} label={'Фамилия'} setData={setData}/>*/}
        <ProfileFormName user={session.user}/>
        <Button onClick={callbacks.onChangePassword} variant={'text'}>
          <Typography fontWeight={'lighter'} fontSize={'small'} textTransform={'none'}>Сменить пароль</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export {ProfieEdit};