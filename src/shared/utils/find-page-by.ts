import {RoutesType} from "../../entities/page-controller/models.ts";
import {nestedListInList} from "./nested-list-in-list.ts";

export const findPageBy = (pages:RoutesType[],by:keyof RoutesType,id?:string):RoutesType | null => {
  const list = nestedListInList(pages)
  let page:string
  for(page in list){
    if(list[page][by] === id) return list[page];
    //if(pages[page][by] !== id) return findPageBy(pages[page].children,by,id)
  }
  return null
}