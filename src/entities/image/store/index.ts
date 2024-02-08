import { default as imagesReducers} from './images/reducer.ts';

const imageState = {
  images:imagesReducers,
}
const imageActions = {
  ...imagesActions,
}

export {imageState, imageActions}