import {Box, Typography} from "@mui/material";
import {IDocument} from "../../entities/document/model/document-model.ts";
import {ManagerLayout} from "../../shared/components/manager-layout";
import {DocumentLayout} from "../../shared/components/document-layout";
import {ProductNoDocuments} from "../product-no-documents";

interface ProdcutDocumentsProps {
  
  documents?:IDocument[]
  
}

const ProdcutDocuments = (props:ProdcutDocumentsProps) => {

  return (
    <ManagerLayout>
      <Box>
        <Typography fontWeight={'bold'}>Документы:</Typography>
      </Box>
      <Box display={'flex'} justifyContent={'flex-start'} py={1}>
        {
          props?.documents?.length !== 0 && props?.documents?.map((document) =>
         <DocumentLayout document={document} key={document.id}/>
          )
        }
        {
          props?.documents?.length === 0 && <ProductNoDocuments/>
        }
      </Box>
    </ManagerLayout>
  );
};

export {ProdcutDocuments};