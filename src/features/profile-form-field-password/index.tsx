import {ChangeEvent, useCallback, useRef, useState} from 'react';
import {Box} from "@mui/material";
import {useFormValidation} from "../../shared/hooks/use-form-validation.ts";
import {useUpdateUserPasswordMutation} from "../../entities/user/store/users/api.ts";
import {IUser} from "../../entities/user/model/user-model.ts";
import {FormButton} from "../../shared/components/form-button";
import {useRedirect} from "../../entities/page-controller/hooks/use-redirect.ts";
import {ValidatedFieldPassword} from "../validated-field-password";

interface ProfileFormPasswordProps {
  
  user?:IUser
  
}

const ProfileFormPassword = (props:ProfileFormPasswordProps) => {
  const ref = useRef<HTMLFormElement>(null)
  const {back} = useRedirect()
  const [data, setData] = useState<{currentPassword?:string,password?:string}>({})
  const currentPasswordValidation = useFormValidation(/^\S{4,20}$/,'Некорректный пароль(от 4 до 20 символов)')
  const passwordValidation = useFormValidation(/^\S{4,20}$/,'Некорректный пароль(от 4 до 20 символов)')
  
  const [updateUserPassword] = useUpdateUserPasswordMutation()
  const callbacks = {
    
    onSubmit:useCallback(async (e:ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if(currentPasswordValidation.error || passwordValidation.error){
        return
      }
      if(props.user?.id){
        try {
          const userData = await updateUserPassword({data,userId:props.user.id}).unwrap()
          if(userData.item){
            currentPasswordValidation.setBlur(false)
            passwordValidation.setBlur(false)
            ref.current?.blur();
            back()
          }
        }catch (e){
          console.log(e)
        }
      }
    },[props.user?.id,passwordValidation, currentPasswordValidation,updateUserPassword,data]),
    
  }
  return (
    <Box
      width={350}
      ref={ref}
      my={1}
      p={1}
      component={'form'}
      onSubmit={callbacks.onSubmit}
    >
      <Box>
        <ValidatedFieldPassword value={data.currentPassword} setData={setData} validation={currentPasswordValidation} name={'currentPassword'} label={'Текущий пароль'}/>
        <ValidatedFieldPassword value={data.password} setData={setData} validation={passwordValidation} name={'password'} label={'Новый пароль'}/>
      
        <FormButton type={"submit"} textTransform={'none'} fontWeight={'normal'} sx={{mt:0.5}} size={'small'}>Сменить пароль</FormButton>
      </Box>
    </Box>
  );
};

export {ProfileFormPassword};