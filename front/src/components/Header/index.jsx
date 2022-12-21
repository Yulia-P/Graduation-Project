import React from 'react';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { selectIsAuth, logout } from '../../redux/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import { AuthUserMenu } from '../AuthUserMenu';

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.auth);
   console.log(data)
  // isAdmin={userData?.user.role === "admin"}
  
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хоти выйти?'))
    dispatch(logout());
    window.localStorage.removeItem('accessToken');
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>EcoFuture</div>
          </Link>
          <div className={styles.buttons}>
          {/* {isAdmin={userData?.user.role === "admin"}} */}
            {isAuth ? (
              <>
              <AuthUserMenu role={data.user.role}/>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>

              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
