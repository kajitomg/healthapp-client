import {Box} from "@mui/material";
import {FormEvent, useCallback, useState} from "react";
import {FormButton} from "../../shared/components/form-button";
import {useAuth} from "../../entities/user/hooks/use-auth.ts";
import {ValidatedFieldName} from "../../features/validated-field-name";
import {ValidatedFieldEmail} from "../../features/validated-field-email";
import {ValidatedFieldPassword} from "../../features/validated-field-password";
import {AuthFormLayout} from "../../shared/components/auth-form-layout";
import {useRedirect} from "../../entities/page-controller/hooks/use-redirect.ts";
import {FormFieldDataType} from "../../shared/components/form-field";

const RegistrationForm = () => {
  const {signup} = useAuth()
  const {back} = useRedirect()
  const [data, setData] = useState<{email?:FormFieldDataType,password?:FormFieldDataType,name?:FormFieldDataType}>({})
  
  const callbacks = {
    onSubmit:useCallback(async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const reformedData:Record<string, string | number> = {}
      for (const [key, value] of Object.entries(data)) {
        reformedData[key] = value.value
      }
      await signup(reformedData)
      await back()
    },[data])
  }

  return (
    <AuthFormLayout title={'Регистрация аккаунта'} onSubmit={callbacks.onSubmit}>
      <ValidatedFieldEmail value={data.email?.value} setData={setData}/>
      <ValidatedFieldPassword value={data.password?.value} setData={setData}/>
      <ValidatedFieldName value={data.name?.value} setData={setData}/>
      <Box display={'flex'} alignItems={'flex-end'} justifyContent={'space-between'} mt={2}>
        <FormButton disabled={data.email?.error || !data.email?.value || data.password?.error || !data.password?.value || data.name?.error} type={'submit'} textTransform={'capitalize'} size={'medium'} fontWeight={'normal'} fontSize={'small'}>Зарегистрироваться</FormButton>
      </Box>
    </AuthFormLayout>
  );
};

export {RegistrationForm};