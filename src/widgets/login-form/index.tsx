import {Box, Button, Typography} from "@mui/material";
import {FormEvent, useCallback, useState} from "react";
import {FormButton} from "../../shared/components/form-button";
import {useAuth} from "../../entities/user/hooks/use-auth.ts";
import {ValidatedFieldEmail} from "../../features/validated-field-email";
import {ValidatedFieldPassword} from "../../features/validated-field-password";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {AuthFormLayout} from "../../shared/components/auth-form-layout";
import {useRedirect} from "../../entities/page-controller/hooks/use-redirect.ts";
import {FormFieldDataType} from "../../shared/components/form-field";


const LoginForm = () => {
  const {signin} = useAuth()
  const {back} = useRedirect()
  const {setPage,pages} = useSetPage()
  const {setParams} = useParams()
  const [data, setData] = useState<{email?:FormFieldDataType,password?:FormFieldDataType}>({})
  
  const callbacks = {
    
    onSubmit:useCallback(async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const reformedData:Record<string, string | number> = {}
      for (const [key, value] of Object.entries(data)) {
        reformedData[key] = value.value
      }
      await signin(reformedData)
      await back()
    },[data]),
    
    onSignUp:useCallback(async () => {
      setPage('registration')
      setParams({},pages?.list?.find(page => page.id === 'registration'))
    },[setPage,setParams])
  }
  
  return (
    <AuthFormLayout title={'Авторизация аккаунта'} onSubmit={callbacks.onSubmit}>
      <ValidatedFieldEmail value={data.email?.value} setData={setData}/>
      <ValidatedFieldPassword value={data.password?.value} setData={setData}/>
      <Box display={'flex'} alignItems={'flex-end'} justifyContent={'space-between'} mt={2}>
        <FormButton disabled={data.email?.error || !data.email?.value || data.password?.error || !data.password?.value} type={'submit'} textTransform={'capitalize'} size={'medium'} fontWeight={'normal'} fontSize={'small'}>Войти</FormButton>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography fontSize={'small'} fontWeight={'lighter'}>Нет аккаунта?</Typography><Button onClick={callbacks.onSignUp} size={'small'} variant={'text'}><Typography textTransform={'none'} fontSize={'small'} fontWeight={'lighter'}>Зарегистрируйте его</Typography></Button>
        </Box>
      </Box>
    </AuthFormLayout>
  );
};

export {LoginForm};