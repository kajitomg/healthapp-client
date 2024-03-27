import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import styled from "@mui/material/styles/styled";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {CatalogProductsCardActions} from "../catalog-products-card-actions";
import {CatalogProductsCardContent} from "../catalog-products-card-content";
import {CatalogProductsCardMedia} from "../catalog-products-card-media";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {ProductCard} from "../product-card";

interface CatalogProductsCardProps {
  
  item:IProduct,
  
  onClick?:(id:number) => void,
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,
  
}

const StyledCatalogProductsCard = styled(ProductCard)(() => ({
  flexDirection:'column',
  justifyContent:'space-between',
  width: 'calc(33.333% - 16px)',
  '@container (max-width: 900px)': {
    width: 'calc(50% - 16px)'
  },
  "@container (max-width: 600px)": {
    width: 'calc(100% - 16px)'
  },
}))



const CatalogProductsCard = (props:CatalogProductsCardProps) => {
  const {item,cartProps,likeProps} = props

  
  return (
    <StyledCatalogProductsCard productId={item.id}>
        <CatalogProductsCardMedia images={item.images}/>
        <CardContent>
          <CatalogProductsCardContent name={item.name} description={item.description} article={item.article} count={item.count}/>
        </CardContent>
        <CardActions>
          <CatalogProductsCardActions discount={item.discount} price={item.price} product={item} cartProps={cartProps} likeProps={likeProps}/>
        </CardActions>
    </StyledCatalogProductsCard>
  );
};

export {CatalogProductsCard};