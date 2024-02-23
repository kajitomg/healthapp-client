import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useCallback, useEffect, useState} from "react";

export interface Option {
  value:string,
  title:string
}

interface SelectFormProps {
  
  values: Option[],
  
  initialValue?:Option,
  
  onSelect?:(value:string) => void,
  
  label?:string,
  
}

const SelectForm = (props:SelectFormProps) => {
  const [item, setItem] = useState<Option | null>(props.initialValue || null)
  
  const callbacks = {
    
    onChange:useCallback((item:SelectChangeEvent) => {
      setItem(props.values.find((value) => value.value === item.target.value) || null)
      
      props.onSelect && props.onSelect(item.target.value)
    },[])
  }
  
  useEffect(() => {
    if(item){
      props.onSelect && props.onSelect(item.value)
    }
  },[])
  
  return (
    <FormControl fullWidth variant={'standard'} size={'small'}>
      <InputLabel id="elect-label">{props.label}</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={item?.value}
        label={props.label}
        onChange={callbacks.onChange}
      >
        {props.values.map((item) =>
          <MenuItem key={item.value} value={item.value}>{item.title}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export {SelectForm};