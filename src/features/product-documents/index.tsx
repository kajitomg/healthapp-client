import {Box, Button, Typography} from "@mui/material";
import {IDocument} from "../../entities/document/model/document-model.ts";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import config from "../../config.ts";

interface ProdcutDocumentsProps {
  
  documents?:IDocument[]
  
}

const ProdcutDocuments = (props:ProdcutDocumentsProps) => {

  return (
    <Box m={2}>
      <Box >
        <Typography>Документы:</Typography>
      </Box>
      <Box display={'flex'} justifyContent={'flex-start'}>
        {
          props?.documents && props?.documents?.length > 0 && props?.documents.map((document) =>
          <Button variant={'text'} href={config.api.baseUrl + '/' + document.path} key={document.id} startIcon={<InsertDriveFileIcon/>}>
            <Typography textTransform={'capitalize'}>{document.name}</Typography>
          </Button>
          )
        }
        {
          props?.documents && props?.documents?.length === 0 &&
          <Typography>Нет документов</Typography>
        }
        
      </Box>
    </Box>
  );
};

export {ProdcutDocuments};