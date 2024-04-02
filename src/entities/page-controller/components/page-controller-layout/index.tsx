import {useActions} from "../../../../shared/services/redux/hooks/use-actions.ts";
import {memo, ReactNode, useLayoutEffect} from "react";
import {routes} from "../../routes";
import {findPageBy} from "../../../../shared/utils/find-page-by.ts";
import {useLocation, useParams} from "react-router-dom";
import {getLocationQuery} from "../../../../shared/utils/get-location-query.ts";

interface PageControllerLayoutProps {
  children?:ReactNode
}

const PageControllerLayout = memo((props:PageControllerLayoutProps) => {
  const {id} = useParams()
  const location = useLocation()
  const {pageController} = useActions()
  
  useLayoutEffect(() => {
    const query = getLocationQuery()
    
    const queryPath = (query && window.location.pathname.split(query.toString())) ? window.location.pathname.split(query.toString())[0] : null

    const path = queryPath ? `${queryPath}:id`:window.location.pathname

    pageController.setPages({pages:routes})
    pageController.setPage({id:findPageBy(routes,'path',path)?.id,query:id})
  },[location])
  return (
    <>
      {props.children}
    </>
  );
});

export {PageControllerLayout};