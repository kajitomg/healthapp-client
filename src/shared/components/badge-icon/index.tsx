import React, {ReactElement} from 'react';
import {Badge} from "@mui/material";

interface BadgeIconProps {
  
  badge?:boolean,
  
  content?:string | number,
  
  icon?:ReactElement
  
}

const BadgeIcon = (props:BadgeIconProps) => {
  
  if(props.badge && props.content){
    return (
      <Badge badgeContent={props.content} color={'primary'}>
        {props.icon}
      </Badge>
    );
  }
  return props.icon
};

export {BadgeIcon};