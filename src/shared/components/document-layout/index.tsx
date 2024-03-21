import config from "../../../config.ts";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {Button} from "@mui/material";
import {IDocument} from "../../../entities/document/model/document-model.ts";
import {ButtonTypography} from "../button-typography";

interface DocumentLayoutProps {
  
  document?:IDocument
  
}

const DocumentLayout = (props:DocumentLayoutProps) => {
  
  return (
    <Button variant={'text'} href={config.api.baseUrl + '/' + props.document?.path} startIcon={<InsertDriveFileIcon/>}>
      <ButtonTypography fontWeight={'normal'}>{props.document?.name}</ButtonTypography>
    </Button>
  );
};

export {DocumentLayout};