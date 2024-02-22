import {JSX} from "react";

interface ListProps {
  
  list?:any[]
  
  renderItem?:(item:any) => JSX.Element
  
}

const List = (props:ListProps) => {
  
  if(props.list){
    return (
      props.list.map(item =>
        props.renderItem && props.renderItem(item)
      )
    );
  }
  return null
};

export {List};