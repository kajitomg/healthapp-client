import {Box, Typography} from "@mui/material";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {FullsizeImageLayout} from "../../shared/components/fullsize-image-layout";
import mainImage from "../../imgaes/main.jpg";
import {ProfieEdit} from "../../widgets/profile-edit";
import {ProfileData} from "../../widgets/profile-data";

const Profile = () => {
  const {page} = useSetPage()
  
  return (
    <Box>
      <FullsizeImageLayout image={mainImage} imageAlt={'Изображение'} height={200} isIndents={true}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <Typography fontSize={'xxx-large'} color={'whitesmoke'}>{page?.name || 'Избранное'}</Typography>
        </Box>
      </FullsizeImageLayout>
      <MainContentLayout>
        <ProfieEdit/>
      </MainContentLayout>
    </Box>
  );
};

export default Profile;