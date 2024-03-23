import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface CatalogSearchButtonProps {
  onClick?:() => void
}

const CatalogSearchButton = (props:CatalogSearchButtonProps) => {
  
  return (
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={props.onClick}>
      <SearchIcon />
    </IconButton>
  );
};

export {CatalogSearchButton};