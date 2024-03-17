import {Box, SxProps, Typography} from "@mui/material";

interface FooterContactsProps {
  sx?:SxProps
}

const FooterContacts = (props:FooterContactsProps) => {
  return (
    <Box display={'flex'} flexDirection={'column'} my={1} p={1} sx={{...props.sx}}>
      <Typography p={0.5} fontWeight={'bold'}>Контакты</Typography>
      <Typography p={0.5} fontSize={'small'}>192029, г.Санкт-Петербург, пр.Обуховской обороны, д.76, корп 7, лит А , пом. 2301</Typography>
      <Box p={0.5}>
        <Typography fontSize={'small'} fontWeight={'bold'}>Телефон:</Typography>
        <Typography fontSize={'small'}>+7(812)677-02-50</Typography>
        <Typography fontSize={'small'}>+7(812)677-02-23</Typography>
      </Box>
      <Box p={0.5}>
        <Typography fontSize={'small'} fontWeight={'bold'}>E-mail:</Typography>
        <Typography fontSize={'small'}>allianceht@mail.ru</Typography>
      </Box>
      <Typography p={0.5} fontSize={'small'}>Ежедневно с 8:00 до 20:00</Typography>
    </Box>
  );
};

export {FooterContacts};