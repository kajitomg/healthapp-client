import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import {useFormValidation} from "../../shared/hooks/use-form-validation.ts";
import {ProfileFormActions} from "../profile-form-actions";
import {useUpdateUserMutation} from "../../entities/user/store/users/api.ts";
import {IUser} from "../../entities/user/model/user-model.ts";
import {ValidatedFieldPhonenumber} from "../validated-field-phonenumber";
import {FormFieldDataType} from "../../shared/components/form-field";

interface ProfileFormPhonenumberProps {
  
  user?:IUser
  
}

const ProfileFormPhonenumber = (props:ProfileFormPhonenumberProps) => {
  const ref = useRef<HTMLFormElement>(null)
  const [data, setData] = useState<{phonenumber?:FormFieldDataType}>({
    phonenumber:{value:props.user?.phonenumber || '',error:false},
  })
  const validation = useFormValidation(new RegExp('^\\+?[78][\\s]?[-\\(]?[\\s]?\\d{3}?\\)?[\\s]?-?\\d{3}?-?\\d{2}?-?\\d{2}?$'),'Некорректный номер телефона')
  
  const [updateUser] = useUpdateUserMutation()
  const callbacks = {
    onSubmit:useCallback(async (e:ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if(validation.error){
        return
      }
      if(props.user?.id){
        try {
          const userData = await updateUser({data:{phonenumber:data.phonenumber?.value.toString()},userId:props.user.id}).unwrap()
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
      e.target.value = props.user?.phonenumber || ''
      validation.onChange(e)
      validation.setBlur(false)
      setData({phonenumber:{value:props.user?.phonenumber || '',error:false}})
    },[props.user?.phonenumber,validation]),
  }
  
  useEffect(() => {
    setData({
      phonenumber:{value:props.user?.phonenumber || '',error:false}
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
       <ValidatedFieldPhonenumber value={data.phonenumber?.value} setData={setData} validation={validation}/>
        {validation.blur && !validation.error &&
          <Box my={1}>
            <ProfileFormActions/>
          </Box>}
      </Box>
    </Box>
  );
};

export {ProfileFormPhonenumber};