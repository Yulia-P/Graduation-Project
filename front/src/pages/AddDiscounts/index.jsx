import React from "react"; 
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux';
import { fetchAddDiscounts } from "../../redux/slices/discounts";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import styles from './Login.module.scss';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";

 
export const AddDiscounts = () => { 
  const {id} = useParams();

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
        Discount: '',
        PointD: ''
    },
    mode: 'all',
  });

  const onSubmit = async (values) => {
    //const data = dispatch(fetchRecept(values));
    setResponse(await dispatch(fetchAddDiscounts(values)));

    if(!response.meta.requestStatus === 'fulfilled'){
      return alert('Не удалось добавить точку')
    }
   
    return alert( response.payload.message)
  }
 
  return ( 

    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Добавляем скидку
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}> 
      <TextField
        className={styles.field}
        label="Скидка"
        error = {Boolean(errors.Discount?.message)}
        helperText={errors.Discount?.message}
        {...register('Discount', {required: 'Введите скидку'})}
        fullWidth/>      
        
        <TextField
        className={styles.field}
        label="Баллы"
        error = {Boolean(errors.PointD?.message)}
        helperText={errors.PointD?.message}
        {...register('PointD', {required: 'Введите сколько баллов нужно для скидки'})}
        fullWidth/> 

      <Button disabled={!isValid} type ="submit" size="large" variant="contained" fullWidth>
        Отправить
      </Button>
      </form>
    </Paper>
  ); 
};