import {selectTabsElement, TabsControllerElementState} from "../store/tabs-controller/reducer.ts";
import {useActions} from "../../../shared/services/redux/hooks/use-actions.ts";
import {DependencyList, useCallback, useEffect} from "react";
import {useTypedSelector} from "../../../shared/services/redux/hooks/use-typed-selector.ts";
import {useSetPage} from "../../page-controller/hooks/use-set-page.ts";
import {useParams} from "../../params-controller/hooks/use-params.ts";

export const useTabs = ({name, tabs,availableId}:{name:string, tabs:TabsControllerElementState[],availableId?:string}, deps: DependencyList,) => {
  const {setPage,pages} = useSetPage()
  const {setParams} = useParams()
  const {tabsController} = useActions()
  const state = useTypedSelector(state => selectTabsElement(state, name))
  
  const callbacks = {
    
    setTab:useCallback((event?: React.SyntheticEvent, index: number = 1) => {
      tabsController.setAvailable({name, tabs, index})
      const tab = tabs[index]
      if(tab?.page){
        setPage(tab.page)
        setParams({},pages?.list?.find(page => page.id === tab.page))
      }
    },[tabsController, name, tabs]),
    
    set:useCallback(() => {
      tabsController.set({tabs,name,availableId})
    },[tabsController, tabs, name, availableId]),
    
  }
  
  useEffect(() => {
    callbacks.set()
  },[...deps])
  
  return {list:state?.list || tabs,available:state?.available, ...callbacks}
}