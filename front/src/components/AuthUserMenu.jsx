import React from 'react';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../redux/slices/auth';
import styles from './Header/Header.module.scss';
import { useNavigate, Navigate, useParams } from "react-router-dom";


export const AuthUserMenu = ({role}) => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const onClickLogout = () => {
        if (window.confirm('Вы действительно хоти выйти?'))
        dispatch(logout());
        window.localStorage.removeItem('accessToken');
        navigate("/login")
      };

    return <>
    {role === "user" ? <>
              <Link to="/receptions"> 
              <Button  variant="contained">Сдать отходы</Button>
              </Link>
              <Link to="/discounts"> 
              <Button variant="contained">Мои скидки</Button>
              </Link>
              <Link to="/points"> 
              <Button variant="contained">Точки сбора</Button>
              </Link>
                <Link to="/addpost">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </> : <>
              <Link to="/receptions"> 
              <Button className={styles.linkk} variant="contained">Сдать отходы</Button>
              </Link>
              <Link to="/discounts"> 
              <Button className={styles.linkk} variant="contained">Мои скидки</Button>
              </Link>
              <Link to="/points"> 
              <Button className={styles.linkk} variant="contained">Точки сбора</Button>
              </Link>
              <Link to="/addpoints"> 
              <Button className={styles.linkk} variant="contained">Добавить точки сбора</Button>
              </Link>
              <Link to="/adddiscounts"> 
              <Button className={styles.linkk} variant="contained">Добавить скидки</Button>
              </Link>
               <Link to="/addpost">
                 <Button className={styles.linkk} variant="contained">Написать статью</Button>
               </Link>
               <Link to="/alldiscounts">
                 <Button className={styles.linkk} variant="contained">Все скидки</Button>
               </Link>
                <Button className={styles.linkk} onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>}
    </>
}