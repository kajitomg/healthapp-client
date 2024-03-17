import {ModelType} from "../../../shared/models";

export interface ILikeProduct extends ModelType  {
  likeId: number,
  productId?: number
}
