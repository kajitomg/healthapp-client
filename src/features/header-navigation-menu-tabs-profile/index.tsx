import {Box, Divider} from "@mui/material";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {Login, Logout, Settings} from "@mui/icons-material";
import {useCallback} from "react";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {useAuth} from "../../entities/user/hooks/use-auth.ts";
import {HeaderNavigationMenuTabsLayout} from "../../shared/components/header-navigation-menu-tabs-layout";
import {HeaderNavigationMenuTabsItem} from "../../shared/components/header-navigation-menu-tabs-item";

interface ProfileButtonListProps {
  
  anchorEl?:EventTarget & Element | null,
  
  onClose?:() => void
  
}

const HeaderNavigationMenuTabsProfile = (props:ProfileButtonListProps) => {
  const session = useTypedSelector(state => state.session)
  const {signout} = useAuth()
  const {setPage,pages,page} = useSetPage()
  const {setParams} = useParams()
  
  
  const callbacks = {
    
    onAccountClick: useCallback(() => {
      setPage('profile')
      setParams({},pages?.list?.find(page => page.id === 'profile'))
    },[setParams,page]),
    
    signOut: useCallback(() => {
      signout()
    },[]),
    
    signIn: useCallback(() => {
      setPage('login')
      setParams({},pages?.list?.find(page => page.id === 'login'))
    },[setParams,page]),
    
  }
  
  return (
    <HeaderNavigationMenuTabsLayout
      onClose={props.onClose}
      anchorEl={props.anchorEl}
    >
      {session.user.id &&
        <Box>
          <HeaderNavigationMenuTabsItem
            onClick={callbacks.onAccountClick}
            title={'Перейти на страницу настройки'}
            text={session.user.email}
          />
          <Divider />
          <HeaderNavigationMenuTabsItem
            onClick={callbacks.onAccountClick}
            title={'Перейти на страницу настройки'}
            icon={<Settings fontSize="small" />}
            text={'Настройки'}
          />
          <HeaderNavigationMenuTabsItem
            onClick={callbacks.signOut}
            title={'Выйти из аккаунта'}
            icon={<Logout fontSize="small" />}
            text={'Выйти'}
          />
        </Box>
      }
      {!session.user.id &&
        <HeaderNavigationMenuTabsItem
          onClick={callbacks.signIn}
          title={'Перейти на страницу авторизации'}
          icon={<Login fontSize="small" />}
          text={'Войти'}
        />
      }
    </HeaderNavigationMenuTabsLayout>
  );
};

export {HeaderNavigationMenuTabsProfile};