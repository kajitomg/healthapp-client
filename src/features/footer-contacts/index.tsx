import Box from "@mui/material/Box";
import {SxProps} from "@mui/material";
import Typography from "@mui/material/Typography";
import {shops} from "../../mock/data.ts";

interface FooterContactsProps {
  
  sx?:SxProps
  
}

const FooterContacts = (props:FooterContactsProps) => {
  return (
    <Box display={'flex'} flexDirection={'column'} my={1} p={1} sx={{...props.sx}}>
      <Typography p={0.5} fontWeight={'bold'}>Контакты</Typography>
      <Typography p={0.5} fontSize={'small'}>{shops[0]?.address}</Typography>
      <Box p={0.5}>
        <Typography fontSize={'small'} fontWeight={'bold'}>Телефон:</Typography>
        {shops[0]?.phonenumbers?.map((phonenumber) =>
          <Typography key={phonenumber} fontSize={'small'}>{phonenumber}</Typography>
        )}
      </Box>
      <Box p={0.5}>
        <Typography fontSize={'small'} fontWeight={'bold'}>E-mail:</Typography>
        {shops[0]?.emails?.map((email) =>
          <Typography key={email} fontSize={'small'}>{email}</Typography>
        )}
      </Box>
      <Typography p={0.5} fontSize={'small'}>{shops[0]?.worktime}</Typography>
    </Box>
  );
};

export {FooterContacts};