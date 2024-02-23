import {replaceHistory} from "./replace-history.ts";
import {pushHistory} from "./push-history.ts";

const updateHistory = (url:string,replace?:boolean) => {
  if (replace) {
    replaceHistory({}, '', url);
  } else {
    pushHistory({}, '', url);
  }
}

export {updateHistory}