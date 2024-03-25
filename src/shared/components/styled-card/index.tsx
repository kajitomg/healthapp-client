import {Card, styled} from "@mui/material";
import {memo} from "react";

export const StyledCard = memo(styled(Card)(({theme}) => ({
  display:'flex',
  cursor:'pointer',
  margin: theme.spacing(1),
})))