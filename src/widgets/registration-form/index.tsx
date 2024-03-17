import {Box} from "@mui/material";
import {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {FormButton} from "../../shared/components/form-button";
import {useAuth} from "../../entities/user/hooks/use-auth.ts";
import {ValidatedFieldName} from "../../features/validated-field-name";
import {ValidatedFieldEmail} from "../../features/validated-field-email";
import {ValidatedFieldPassword} from "../../features/validated-field-password";
import {AuthFormLayout} from "../../shared/components/auth-form-layout";
import {useRedirect} from "../../entities/page-controller/hooks/use-redirect.ts";

const RegistrationForm = () => {
  const {signup} = useAuth()
  const {back} = useRedirect()
  const [data, setData] = useState<{email?:string,password?:string,name?:string}>({})
  
  const callbacks = {
    onChange:useCallback((name:string) => {
      return (event:ChangeEvent<HTMLInputElement>) => {
        setData(prevData => ({...prevData, [name]: event.target.value}));
      }
    },[]),
    onSubmit:useCallback(async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await signup(data)
      await back()
    },[data])
  }
  
  return (
    <AuthFormLayout title={'Регистрация аккаунта'} onSubmit={callbacks.onSubmit}>
      <ValidatedFieldName value={data.name} setData={setData}/>
      <ValidatedFieldEmail value={data.email} setData={setData}/>
      <ValidatedFieldPassword value={data.password} setData={setData}/>
      <Box display={'flex'} alignItems={'flex-end'} justifyContent={'space-between'} mt={2}>
        <FormButton type={'submit'} textTransform={'capitalize'} size={'medium'} fontWeight={'normal'} fontSize={'small'}>Зарегистрироваться</FormButton>
      </Box>
    </AuthFormLayout>
  );
};

export {RegistrationForm};