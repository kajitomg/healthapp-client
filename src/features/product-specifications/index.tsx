import {ISpecification} from "../../entities/product/model/specification-model.ts";
import {useLoadTypesQuery} from "../../entities/product/store/types/api.ts";
import {Box, Divider, Typography} from "@mui/material";

interface ProductSpecificationsProps {
  
  specifications?:ISpecification[]
  
}

const ProductSpecifications = (props:ProductSpecificationsProps) => {
  const {data} = useLoadTypesQuery({params:{
      data:JSON.stringify({id:props.specifications?.map(specification => specification.typeId)}),
    }})

  return (
    <Box>
      <Box my={2} mb={3}>
        <Typography fontWeight={'bold'} fontSize={'x-large'}>Характеристики</Typography>
      </Box>
      {data?.list.map((type) =>
        <Box key={type.id} display={'flex'} flexDirection={'column'}>
          <Typography fontWeight={'bold'} fontSize={'large'}>{type.value}</Typography>
          <Box my={1}>
            {props.specifications?.map(specification =>
              specification.typeId === type.id &&
              <Box key={specification.id} >
                <Box display={'flex'} alignItems={'center'}>
                  <Typography flex={'0 0 50%'} fontWeight={'lighter'} fontSize={'small'}>{specification.name}:</Typography>
                  <Typography flex={'0 0 50%'} fontWeight={'normal'} fontSize={'small'}>{specification?.['product-specification']?.value}</Typography>
                </Box>
                <Divider/>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export {ProductSpecifications};