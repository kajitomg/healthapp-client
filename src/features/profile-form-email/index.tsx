import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {Box} from "@mui/material";
import {useFormValidation} from "../../shared/hooks/use-form-validation.ts";
import {ProfileFormActions} from "../profile-form-actions";
import {useUpdateUserEmailMutation} from "../../entities/user/store/users/api.ts";
import {IUser} from "../../entities/user/model/user-model.ts";
import {ValidatedFieldEmail} from "../validated-field-email";

interface ProfileFormEmailProps {
  
  user?:IUser
  
}

const ProfileFormEmail = (props:ProfileFormEmailProps) => {
  const ref = useRef<HTMLFormElement>(null)
  const [data, setData] = useState<{email?:string}>({
    email:props.user?.email || '',
  })
  const validation = useFormValidation(new RegExp(/^\S+@\S+\.\S+$/),'Некорректный email')
  
  const [updateUserEmail] = useUpdateUserEmailMutation()
  const callbacks = {
    onSubmit:useCallback(async (e:ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if(validation.error){
        return
      }
      if(props.user?.id){
        try {
          const userData = await updateUserEmail({data,userId:props.user.id}).unwrap()
          if(userData.item){
            validation.setBlur(false)
            ref.current?.blur();
          }
        }catch (e){
          console.log(e)
        }
      }
    },[props.user?.id,validation,updateUserEmail,data]),
    
    onReset:useCallback(async (e:ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.target.value = ''
      validation.onChange(e)
      setData({email:props.user?.email || ''})
    },[validation]),
  }
  
  useEffect(() => {
    setData({
      email:props.user?.email || '',
    })
  },[props.user?.id])
  
  return (
    <Box
      my={1}
      p={1}
      ref={ref}
      component={'form'}
      onSubmit={callbacks.onSubmit}
      onReset={callbacks.onReset}
    >
      <Box>
       <ValidatedFieldEmail value={data.email} setData={setData} validation={validation}/>
        {validation.blur && !validation.error &&
          <Box my={1}>
            <ProfileFormActions/>
          </Box>}
      </Box>
    </Box>
  );
};

export {ProfileFormEmail};