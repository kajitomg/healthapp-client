import {Box, Divider, ListItemIcon, Menu, MenuItem, Typography} from "@mui/material";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {Login, Logout, Settings} from "@mui/icons-material";
import {useCallback} from "react";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {useAuth} from "../../entities/user/hooks/use-auth.ts";

interface ProfileButtonListProps {
  
  anchorEl?:EventTarget & Element | null,
  
  onClose?:() => void
  
}

const ProfileButtonList = (props:ProfileButtonListProps) => {
  const session = useTypedSelector(state => state.session)
  const {signout} = useAuth()
  const open = Boolean(props.anchorEl);
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
    <Menu
      anchorEl={props.anchorEl}
      id="account-menu"
      open={open}
      onClose={props.onClose}
      onClick={props.onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
         
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {session.user.id &&
        <Box>
          <MenuItem onClick={callbacks.onAccountClick}  title={'Перейти на страницу настройки'}>
            {/*<Avatar />*/} {session.user.email}
          </MenuItem>
          <Divider />
          <MenuItem onClick={callbacks.onAccountClick} title={'Перейти на страницу настройки'}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Настройки
          </MenuItem>
          <MenuItem onClick={callbacks.signOut} title={'Выйти из аккаунта'}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <Typography >Выйти</Typography>
          </MenuItem>
        </Box>
      }
      {!session.user.id &&
        <MenuItem onClick={callbacks.signIn} title={'Перейти на страницу авторизации'}>
          <ListItemIcon>
            <Login fontSize="small" />
          </ListItemIcon>
          <Typography>Войти</Typography>
        </MenuItem>
      }
    </Menu>
  );
};

export {ProfileButtonList};