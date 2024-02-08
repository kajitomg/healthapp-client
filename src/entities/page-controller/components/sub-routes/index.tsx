import {Route, Routes} from "react-router-dom";
import {RoutesType} from "../../models.ts";
import {Protected} from "../../../../widgets/protected";
import {nestedListInList} from "../../../../shared/utils/nested-list-in-list.ts";

interface SubRoutesProps {
  routes:RoutesType[]
}
const SubRoutes = (props:SubRoutesProps) => {
  
  return (
    <Routes>
      {nestedListInList(props.routes).map(route =>
        <Route key={route.id} path={route.path} element={<Protected authPath={route.auth} redirect={route.redirect}>{route.element}</Protected>}/>
      )}
    </Routes>
  )
};

export {SubRoutes};