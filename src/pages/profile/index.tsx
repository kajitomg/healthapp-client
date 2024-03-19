import {Box} from "@mui/material";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import mainImage from "../../imgaes/main.jpg";
import {ProfieEdit} from "../../widgets/profile-edit";
import {PageImageLayout} from "../../shared/components/page-image-layout";
import mainImageSM from "../../imgaes/main_SM.jpg";

const Profile = () => {
  const {page} = useSetPage()
  
  return (
    <Box>
      <PageImageLayout
        image={mainImage}
        progressiveImage={mainImageSM}
        imageAlt={'Изображение'}
        title={page?.name}
      />
      <MainContentLayout>
        <ProfieEdit/>
      </MainContentLayout>
    </Box>
  );
};

export default Profile;