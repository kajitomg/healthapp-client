import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {MainContentLayout} from "../../shared/components/main-content-layout";

const Error = () => {
  const {setPage} = useSetPage()
  
  return (
    <Box>
      <MainContentLayout>
        <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
          <Typography color={'red'}>error</Typography>
          <Typography color={'black'}><Button onClick={() => setPage('main')} variant={'text'} size={'small'}>Вернуться</Button> на главную страницу</Typography>
        </Box>
      </MainContentLayout>
    </Box>
  );
};

export default Error;