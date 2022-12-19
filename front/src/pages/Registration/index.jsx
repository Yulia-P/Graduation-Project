import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux';
import { Navigate } from "react-router-dom";
import styles from './Login.module.scss';
import { fetchReg, selectIsAuth } from "../../redux/slices/auth";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register, 
    handleSubmit, 
    // setError, 
    formState: {errors, isValid}, 
  } = useForm({
    defaultValues: {
      username: 'kate',
      email: 'kate@gmail.com',
      passwordHash: '123456789'
    },
    mode: 'all',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchReg(values));

    if(!data.payload){
      return alert('Не удалось зарегистрироваться')
    }
    if ('accessToken' in data.payload){
      window.localStorage.setItem('accessToken', data.payload.accessToken);
    }
  };

  if (isAuth) {
    return <Navigate to="*" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>   
      <TextField
        className={styles.field}
        label="Логин"
        error = {Boolean(errors.username?.message)}
        helperText={errors.username?.message}
        {...register('username', {required: 'Введите логин'})}
        fullWidth/>      


        <TextField
        className={styles.field}
        label="Почта"
        error = {Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type="email"
        {...register('email', {required: 'Введите почту'})}
        fullWidth/> 


        <TextField
        className={styles.field}
        label="Пароль"
        error = {Boolean(errors.passwordHash?.message)}
        helperText={errors.passwordHash?.message}
        // type='password'
        {...register('passwordHash', {required: 'Введите пароль'})}
        fullWidth/>

        
      <Button disabled={!isValid} type ="submit" size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
