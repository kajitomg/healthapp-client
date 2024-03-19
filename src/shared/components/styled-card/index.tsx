import {Card, styled} from "@mui/material";

export const StyledCard = styled(Card)(({theme}) => ({
  display:'flex',
  cursor:'pointer',
  margin: theme.spacing(1),
}))