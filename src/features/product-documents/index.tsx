import {Box, Button, Typography} from "@mui/material";
import {IDocument} from "../../entities/document/model/document-model.ts";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import config from "../../config.ts";

interface ProdcutDocumentsProps {
  
  documents?:IDocument[]
  
}

const ProdcutDocuments = (props:ProdcutDocumentsProps) => {

  return (
    <Box my={2} width={'100%'} bgcolor={'white'} borderRadius={1} boxShadow={theme => theme.shadows[1]} p={1}>
      <Box >
        <Typography fontWeight={'bold'}>Документы:</Typography>
      </Box>
      <Box display={'flex'} justifyContent={'flex-start'} py={1}>
        {
          props?.documents?.length !== 0 && props?.documents?.map((document) =>
          <Button variant={'text'} href={config.api.baseUrl + '/' + document.path} key={document.id} startIcon={<InsertDriveFileIcon/>}>
            <Typography textTransform={'capitalize'}>{document.name}</Typography>
          </Button>
          )
        }
        {
          props?.documents?.length === 0 &&
          <Typography fontWeight={'bold'} fontSize={'small'}>Нет документов</Typography>
        }
        
      </Box>
    </Box>
  );
};

export {ProdcutDocuments};