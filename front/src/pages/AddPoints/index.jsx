import React from "react"; 
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux';
import { fetchAddPoints } from "../../redux/slices/points";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import styles from './Login.module.scss';
import Button from '@mui/material/Button';
import { useState } from "react";
 
export const AddPoints = () => { 
  // const [title, setTitle] = useState(""); 
  // const [body, setBody] = useState(""); 
  const [response, setResponse] = useState();
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log(response);
  }, [response]);
  const{
    register, 
    handleSubmit,
    formState:{errors, isValid},
  } = useForm({
    defaultValues: {
        Address: '',
        SecretKey: ''
    },
    mode: 'all',
  });

  const onSubmit = async (values) => {
    //const data = dispatch(fetchRecept(values));
    setResponse(await dispatch(fetchAddPoints(values)));

    if(!response.meta.requestStatus === 'fulfilled'){
      return alert('Не удалось добавить точку')
    }
    return alert('Точка сбора добавлена')
  }
 
  return ( 

    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Добавляем точку сбора
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}> 
      <TextField
        className={styles.field}
        label="Адрес"
        error = {Boolean(errors.Address?.message)}
        helperText={errors.Address?.message}
        {...register('Address', {required: 'Введите адрес'})}
        fullWidth/>      
        
        <TextField
        className={styles.field}
        label="Ключ"
        error = {Boolean(errors.SecretKey?.message)}
        helperText={errors.SecretKey?.message}
        {...register('SecretKey', {required: 'Введите ключ'})}
        fullWidth/> 

      <Button disabled={!isValid} type ="submit" size="large" variant="contained" fullWidth>
        Отправить
      </Button>
      </form>
    </Paper>
  ); 
};