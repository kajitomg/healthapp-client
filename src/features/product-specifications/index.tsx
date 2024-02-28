import {TabPanel} from "../../shared/components/tab-panel";
import {useContext} from "react";
import {ProductNavigationContext} from "../../pages/product";
import {ISpecification} from "../../entities/product/model/specification-model.ts";
import {useLoadTypesQuery} from "../../entities/product/store/types/api.ts";
import {Box, Typography} from "@mui/material";

interface ProductSpecificationsProps {
  
  specifications?:ISpecification[]
  
}

const ProductSpecifications = (props:ProductSpecificationsProps) => {
  const {data} = useLoadTypesQuery({params:{
      data:JSON.stringify({id:props.specifications?.map(specification => specification.typeId)}),
    }})
  const {productNavigationValue} = useContext(ProductNavigationContext)
  console.log(props.specifications)
  return (
    <TabPanel index={1} value={productNavigationValue}>
      {data?.list.map((type) =>
        <Box key={type.id}>
          <Typography>{type.value}</Typography>
          {props.specifications?.map(specification =>
            specification.typeId === type.id &&
            <Box key={specification.id}>
              <Typography>{specification.name}: {specification?.['product-specification']?.value}</Typography>
            </Box>
          )}
        </Box>
      )}
    </TabPanel>
  );
};

export {ProductSpecifications};