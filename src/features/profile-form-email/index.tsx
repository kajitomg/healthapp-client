import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import {useFormValidation} from "../../shared/hooks/use-form-validation.ts";
import {ProfileFormActions} from "../profile-form-actions";
import {useUpdateUserEmailMutation} from "../../entities/user/store/users/api.ts";
import {IUser} from "../../entities/user/model/user-model.ts";
import {ValidatedFieldEmail} from "../validated-field-email";
import {FormFieldDataType} from "../../shared/components/form-field";

interface ProfileFormEmailProps {
  
  user?:IUser,
  
  prevState?:string
  
}

const ProfileFormEmail = (props:ProfileFormEmailProps) => {
  const ref = useRef<HTMLFormElement>(null)
  const [data, setData] = useState<{email?:FormFieldDataType}>({
    email:{value:props.user?.email || '',error:false}
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
          const userData = await updateUserEmail({data:{email:data.email?.value.toString()},userId:props.user.id}).unwrap()
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
      e.target.value = props.user?.email || ''
      validation.onChange(e)
      validation.setBlur(false)
      setData({email:{value:props.user?.email || '',error:false}})
    },[validation,props.user?.email]),
  }
  
  useEffect(() => {
    setData({
      email:{value:props.user?.email || '',error:false}
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
       <ValidatedFieldEmail value={data.email?.value} setData={setData} validation={validation}/>
        {validation.blur && !validation.error &&
          <Box my={1}>
            <ProfileFormActions/>
          </Box>}
      </Box>
    </Box>
  );
};

export {ProfileFormEmail};