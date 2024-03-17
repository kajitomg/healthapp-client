import {useActions} from "../../../../shared/services/redux/hooks/use-actions.ts";
import {ReactNode, useLayoutEffect} from "react";
import {routes} from "../../routes";
import {findPageBy} from "../../../../shared/utils/find-page-by.ts";
import {useParams} from "react-router-dom";

interface PageControllerLayoutProps {
  children?:ReactNode
}

const PageControllerLayout = (props:PageControllerLayoutProps) => {
  const {id} = useParams()
  const {pageController} = useActions()
  
  useLayoutEffect(() => {
    const queryPath = window.location.pathname.split('/').length > 3 ? window.location.pathname.split('/')[1] : null

    const path = queryPath ? `/${queryPath}/:id`:window.location.pathname

    pageController.setPages({pages:routes})
    pageController.setPage({id:findPageBy(routes,'path',path)?.id,query:id})
  },[])
  return (
    <>
      {props.children}
    </>
  );
};

export {PageControllerLayout};