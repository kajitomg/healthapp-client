import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import {useFormValidation} from "../../shared/hooks/use-form-validation.ts";
import {ProfileFormActions} from "../profile-form-actions";
import {useUpdateUserMutation} from "../../entities/user/store/users/api.ts";
import {IUser} from "../../entities/user/model/user-model.ts";
import {ValidatedFieldName} from "../validated-field-name";

interface ProfileFormNameProps {
  
  user?:IUser
  
}

const ProfileFormName = (props:ProfileFormNameProps) => {
  const ref = useRef<HTMLFormElement>(null)
  const [data, setData] = useState<{name?:string}>({
    name:props.user?.name || '',
  })
  const validation = useFormValidation(new RegExp(/^\S{3,20}$/),'Некорректный никнейм(от 3 до 20 символов)')

  const [updateUser] = useUpdateUserMutation()
  const callbacks = {
    onSubmit:useCallback(async (e:ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if(validation.error){
        return
      }
      if(props.user?.id){
        try {
          const userData = await updateUser({data,userId:props.user.id}).unwrap()
          if(userData.item){
            validation.setBlur(false)
            ref.current?.blur();
          }
        }catch (e){
          console.log(e)
        }
      }
    },[props.user?.id,validation,updateUser,data]),
    
    onReset:useCallback(async (e:ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.target.value = ''
      validation.onChange(e)
      setData({name:props.user?.name || ''})
    },[props.user,validation]),
  }
  
  useEffect(() => {
    setData({
      name:props.user?.name || '',
    })
  },[props.user?.id])
  return (
    <Box
      ref={ref}
      my={1}
      p={1}
      component={'form'}
      onSubmit={callbacks.onSubmit}
      onReset={callbacks.onReset}
    >
      <Box>
       <ValidatedFieldName value={data.name} setData={setData} validation={validation}/>
        {validation.blur && !validation.error &&
          <Box my={1}>
            <ProfileFormActions/>
          </Box>}
      </Box>
    </Box>
  );
};

export {ProfileFormName};