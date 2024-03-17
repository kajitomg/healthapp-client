import {Box} from "@mui/material";
import {FormButton} from "../../shared/components/form-button";

const ProfileFormActions = () => {
  return (
    <Box display={'flex'}>
      <FormButton type={"reset"} variant={'outlined'} textTransform={'capitalize'} fontWeight={'bold'} sx={{mr:0.5}} fullWidth>Отмена</FormButton>
      <FormButton type={"submit"} textTransform={'capitalize'} fontWeight={'bold'} sx={{ml:0.5}} fullWidth>Подтвердить</FormButton>
    </Box>
  );
};

export {ProfileFormActions};