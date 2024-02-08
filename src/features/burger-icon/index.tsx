import {Menu as MenuIcon} from "@mui/icons-material";
import {blue} from "@mui/material/colors";
import {IconButton} from "@mui/material";

const BurgerIcon = () => {
  
  return (
    <IconButton edge="start">
      <MenuIcon sx={{color:blue[50]}}/>
    </IconButton>
  );
};

export {BurgerIcon};