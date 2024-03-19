import './styles.scss'
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
import {BottomNavigationMenu} from "../features/bottom-navigation-menu";
import {useMediaQuery, useTheme} from "@mui/material";
import {useEffect} from "react";
import {useAuth} from "../entities/user/hooks/use-auth.ts";
import {useListenHistory} from "../entities/page-controller/hooks/use-listen-history.ts";

const App = () => {
  const theme = useTheme()
  useListenHistory()
  const {refresh} = useAuth()
  const isBottomNavigationAvailable = useMediaQuery(theme.breakpoints.down('md'))
  
  const {DrawerHeader, drawerWidth, headerHeight,name} = useBurger()
  const page = useTypedSelector(state => selectCurrentPage(state))
  const isOpen = useTypedSelector(state => selectIsPopSnapOpen(state,name))

  useEffect(() => {
    refresh()
  },[page])

  return (
    <PageLayout header={<Header/>} footer={<Footer isOpen={isOpen} drawerWidth={drawerWidth}/>}>
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
      {isBottomNavigationAvailable && <BottomNavigationMenu isAvailable={true}/>}
    </PageLayout>
  )
}

export {App}