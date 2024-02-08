import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {Box, Button, Typography} from "@mui/material";

const Error = () => {
  const {setPage} = useSetPage()
  
  return (
    <Box width={'100%'} height={'100%'} display={'flex'} alignItems={'center'} flexDirection={'column'}>
      <Typography color={'red'}>error</Typography>
      <Typography color={'black'}><Button onClick={() => setPage('main')} variant={'text'} size={'small'}>Вернуться</Button> на главную страницу</Typography>
    </Box>
  );
};

export {Error};