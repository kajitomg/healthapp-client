import {RoutesType} from "../../entities/page-controller/models.ts";


export const nestedListInList = (clearList:RoutesType[]):RoutesType[] => {
  const list:RoutesType[] = clearList.map(a => {return {...a}})
  const back:RoutesType[] = []
  list.map(element => {
    const childrens = nestedListInList(element.children)
    element.children = []
    back.push(element)
    back.push(...childrens)
  })
  return back
}