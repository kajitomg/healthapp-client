
import { default as likeReducers} from './likes/reducer.ts';
import {likesActionsList} from "./likes/reducer.ts";

const likeState = {
  like:likeReducers
}
const likeActions = {
  like:likesActionsList,
}

export {likeState,likeActions}