import {ProductNavigationItemLayout} from "../../shared/components/product-navigation-item-layout";

import {ISpecification} from "../../entities/product/model/specification-model.ts";
import {useLoadTypesQuery} from "../../entities/product/store/types/api.ts";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {useSpecifications} from "../../entities/product/hooks/use-specifications.ts";
import {useEffect} from "react";
import {ProductNoSpecification} from "../product-no-specification";

interface ProductSpecificationsProps {
  
  specifications?:ISpecification[],
  
  productId?:number
  
}

const ProductSpecifications = (props:ProductSpecificationsProps) => {
  const {specifications,loadSpecifications} = useSpecifications()

  useEffect(() => {
    if(props.specifications){
      loadSpecifications({
        data:{
          id:props.specifications?.map(specification => specification.id),
        },
        params:{
          ...(props.productId && {'include[product-specification]': ''}),
          ...(props.productId && {'where[product-specification]][productId]': props.productId}),
        },
        options:{
          includeDefaultParams:true
        }
      })
    }
  },[props.productId,props.specifications])

  const {data} = useLoadTypesQuery({params:{
      data:JSON.stringify({id:props.specifications?.map(specification => specification.typeId)}),
    }})

  return (
    <ProductNavigationItemLayout title={'Характеристики'}>
      {data?.list.length !== 0 && data?.list.map((type) =>
        <Box key={type.id} display={'flex'} flexDirection={'column'}>
          <Typography fontWeight={'bold'} fontSize={'large'}>{type.value}</Typography>
          <Box my={1}>
            {specifications?.list.map(specification =>
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
      {!(data?.list.length !== 0) &&
        <ProductNoSpecification/>
      }
    </ProductNavigationItemLayout>
  );
};

export {ProductSpecifications};