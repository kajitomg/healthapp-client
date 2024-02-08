import createStoreRedux from "./redux";
import {Store} from "redux";
import cfg from '../../config.ts'
import {Interceptor} from "./interceptor";
import config from "../../config.ts";

export class Services {
  config:typeof cfg
  private _redux?:Store
  private _interceptor?:Interceptor
  constructor(config:typeof cfg) {
    this.config = config
  }
  
  get interceptor() {
    if (!this._interceptor) {
      this._interceptor = new Interceptor();
    }
    return this._interceptor;
  }
  get redux(){
    if (!this._redux) {
      this._redux = createStoreRedux(this);
    }
    return this._redux;
  }
  
}

export default new Services(config)