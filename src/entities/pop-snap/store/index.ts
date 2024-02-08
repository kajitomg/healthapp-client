import {default as popSnapReducers, popSnapActionsList} from './pop-snap/reducer.ts';

const popSnapActions = {
  popSnap:popSnapActionsList
}

const popSnapState = {
  popSnap:popSnapReducers,
}

export {popSnapActions,popSnapState}