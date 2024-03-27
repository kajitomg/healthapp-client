import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useTheme from "@mui/material/styles/useTheme";

interface CatalogSearchButtonProps {
  onClick?:() => void
}

const CatalogSearchButton = (props:CatalogSearchButtonProps) => {
  const theme = useTheme()
  
  
  return (
    <IconButton type="button" sx={{
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