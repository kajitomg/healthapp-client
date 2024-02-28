import {useLazyLoadProductQuery} from "../../entities/product/store/products/api.ts";
import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {useParams as useReactParams} from "react-router-dom";
import {Box} from "@mui/material";
import {ProductCarousel} from "../../features/product-carousel";
import {ProductData} from "../../features/product-data";
import {ProductDescription} from "../../features/product-description";
import {ProductNavigation} from "../../widgets/product-navigation";
import {ProdcutDocuments} from "../../features/product-documents";
import {ProductSpecifications} from "../../features/product-specifications";

export const ProductNavigationContext = createContext<{productNavigationValue?:number, setProductNavigationValue?:Dispatch<SetStateAction<number>>}>({})

const Product = () => {
  const [productNavigationValue, setProductNavigationValue] = useState(0);
  const {id} = useReactParams()
  const [loadProduct,productData] = useLazyLoadProductQuery()
  
  useEffect(() => {
    if(id){
      loadProduct({
        id:id,
        params:{
          'include[image]':'',
          'include[specification]':'',
          'include[document]':'',
        }
      })
    }
  },[id])
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box display={'flex'} justifyContent={'center'} width={'100%'}>
        <Box maxWidth={'1200px'} width={'100%'}>
          <Box display={'flex'} justifyContent={'space-evenly'}>
            <Box width={'500px'} mx={1}>
              <ProductCarousel images={productData?.data?.item?.images}/>
            </Box>
            <Box width={'500px'}  mx={1}>
              <ProductData data={productData?.data?.item}/>
            </Box>
          </Box>
          <Box>
            <ProdcutDocuments documents={productData?.data?.item?.documents}/>
          </Box>
          <ProductNavigationContext.Provider value={{productNavigationValue, setProductNavigationValue}}>
            <Box display={'flex'} alignItems={'flex-start'}>
              <ProductNavigation/>
              <ProductDescription description={productData?.data?.item?.description}/>
              <ProductSpecifications specifications={productData?.data?.item?.specifications}/>
            </Box>
          </ProductNavigationContext.Provider>
        </Box>
      </Box>
    </Box>
    
  );
};

export {Product};