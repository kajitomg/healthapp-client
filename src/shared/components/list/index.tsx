import {JSX} from "react";

interface ListProps {
  
  list?:any[]
  
  renderItem?:(item:any) => JSX.Element
  
}

const List = (props:ListProps) => {
  return (
    props.list?.map(item =>
      props.renderItem && props.renderItem(item)
    )
  );
};

export {List};