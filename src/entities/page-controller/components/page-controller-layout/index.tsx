import {useActions} from "../../../../shared/services/redux/hooks/use-actions.ts";
import {ReactNode, useLayoutEffect} from "react";
import {routes} from "../../routes";
import {findPageBy} from "../../../../shared/utils/find-page-by.ts";

interface PageControllerLayoutProps {
  children?:ReactNode
}

const PageControllerLayout = (props:PageControllerLayoutProps) => {
  const {pageController} = useActions()
  
  useLayoutEffect(() => {
    pageController.setPages({pages:routes})
    pageController.setPage({id:findPageBy(routes,'path',window.location.pathname)?.id})
  },[])
  
  return (
    <>
      {props.children}
    </>
  );
};

export {PageControllerLayout};