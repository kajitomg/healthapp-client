import './styles.scss'
import {userAPI} from "../entities/user/store/users/api.ts";
import {PageLayout} from "../shared/components/page-layout";
import {MainLayout} from "../features/main-layout";
import {useBurger} from "../widgets/burger/hooks.ts";
import {useTypedSelector} from "../shared/services/redux/hooks/use-typed-selector.ts";
import {routes} from "../entities/page-controller/routes";
import {selectIsPopSnapOpen} from "../entities/pop-snap/store/pop-snap/reducer.ts";
import {PageControllerLayout} from "../entities/page-controller/components/page-controller-layout";
import {ParamsControllerLayout} from "../entities/params-controller/components/params-controller-layout";
import {selectCurrentPage} from "../entities/page-controller/store/page-controller/reducer.ts";
import {SubRoutes} from "../entities/page-controller/components/sub-routes";
import {Header} from "../widgets/header";
import {Footer} from "../widgets/footer";

function App() {
  const {DrawerHeader, drawerWidth, headerHeight,name} = useBurger()
  const page = useTypedSelector(state => selectCurrentPage(state))
  const isOpen = useTypedSelector(state => selectIsPopSnapOpen(state,name))
  const isAvailable = useTypedSelector(state => selectIsPopSnapOpen(state,'burger-available'))
  userAPI.useLoadUsersQuery(1)

  return (
    <PageLayout header={<Header isBurgerAvailable={true}/>} footer={<Footer isOpen={isOpen} drawerWidth={drawerWidth}/>}>
      <DrawerHeader/>
      <MainLayout
        open={isOpen}
        drawerwidth={drawerWidth}
        headerheight={headerHeight}
      >
        <PageControllerLayout>
          <ParamsControllerLayout page={page}>
            <SubRoutes routes={routes}/>
          </ParamsControllerLayout>
        </PageControllerLayout>
      </MainLayout>
    </PageLayout>
  )
}

export {App}