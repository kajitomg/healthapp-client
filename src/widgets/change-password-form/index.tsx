import {Box, Button, Typography} from "@mui/material";
import {FormEvent, memo, useCallback, useState} from "react";
import {FormButton} from "../../shared/components/form-button";
import {useAuth} from "../../entities/user/hooks/use-auth.ts";
import {ValidatedFieldEmail} from "../../features/validated-field-email";
import {ValidatedFieldPassword} from "../../features/validated-field-password";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {AuthFormLayout} from "../../shared/components/auth-form-layout";


const ChangePasswordForm = memo(() => {
  const {signin} = useAuth()
  const {setPage,pages} = useSetPage()
  const {setParams} = useParams()
  const [data, setData] = useState<{email?:string,password?:string}>({})
  
  const callbacks = {
    
    onSubmit:useCallback(async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await signin(data)
    },[data]),
    
    onSignUp:useCallback(async () => {
      setPage('registration')
      setParams({},pages?.list?.find(page => page.id === 'registration'))
    },[setPage,setParams])
  }
  
  return (
    <AuthFormLayout title={'Авторизация аккаунта'} onSubmit={callbacks.onSubmit}>
      <ValidatedFieldEmail value={data.email} setData={setData}/>
      <ValidatedFieldPassword value={data.password} setData={setData}/>
      <Box display={'flex'} alignItems={'flex-end'} justifyContent={'space-between'} mt={2}>
        <FormButton type={'submit'} textTransform={'capitalize'} size={'medium'} fontWeight={'normal'} fontSize={'small'}>Войти</FormButton>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography fontSize={'small'} fontWeight={'lighter'}>Нет аккаунта?</Typography><Button onClick={callbacks.onSignUp} size={'small'} variant={'text'}><Typography textTransform={'none'} fontSize={'small'} fontWeight={'lighter'}>Зарегистрируйте его</Typography></Button>
        </Box>
      </Box>
    </AuthFormLayout>
  );
});

export {ChangePasswordForm};