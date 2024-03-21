import {Route, Routes} from "react-router-dom";
import {RoutesType} from "../../models.ts";
import {Protected} from "../../../../widgets/protected";
import {nestedListInList} from "../../../../shared/utils/nested-list-in-list.ts";
import {Suspense} from "react";
import {Loader} from "../../../../shared/components/loader";

interface SubRoutesProps {
  routes:RoutesType[]
}
const SubRoutes = (props:SubRoutesProps) => {

  return (
    <Routes>
      {nestedListInList(props.routes).map(route =>
        Array.isArray(route.path)
          ? route.path.map((path) =>
            <Route key={route.id} path={path} element={<Suspense fallback={<Loader/>}><Protected authPath={route.auth} redirect={route.redirect}>{route.element}</Protected></Suspense>}/>
          )
          :
        <Route key={route.id} path={route.path} element={<Suspense fallback={<Loader/>}><Protected authPath={route.auth} redirect={route.redirect}>{route.element}</Protected></Suspense>}/>
      )}
    </Routes>
  )
};

export {SubRoutes};