import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useTheme from "@mui/material/styles/useTheme";
import {MouseEventHandler} from "react";

interface CatalogSearchButtonProps {
  onClick?:MouseEventHandler<HTMLButtonElement>
}

const CatalogSearchButton = (props:CatalogSearchButtonProps) => {
  const theme = useTheme()
  
  
  return (
    <IconButton type="submit" sx={{
      p: '10px',
      [theme.breakpoints.down('sm')]: {
        p: '0',
      },
    }} aria-label="search" onClick={props.onClick}>
      <SearchIcon/>
    </IconButton>
  );
};

export {CatalogSearchButton};