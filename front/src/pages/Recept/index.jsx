import React from "react"; 
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux';
import { fetchRecept } from "../../redux/slices/recept";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import styles from './Login.module.scss';
import Button from '@mui/material/Button';
import { useState } from "react";
 
export const Recept = () => { 
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
      Weight: '',
      TypeWaste: '',
      StationKey: ''
    },
    mode: 'all',
  });

  const onSubmit = async (values) => {
    //const data = dispatch(fetchRecept(values));
    setResponse(await dispatch(fetchRecept(values)));

    if(!response.meta.requestStatus === 'fulfilled'){
      return alert('Не удалось зарегистрироваться')
    }
  }
 
  return ( 

    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Здаем отходы
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}> 
      <TextField
        className={styles.field}
        label="Вес"
        error = {Boolean(errors.Weight?.message)}
        helperText={errors.Weight?.message}
        {...register('Weight', {required: 'Введите вес'})}
        fullWidth/>      
        
        <TextField
        className={styles.field}
        label="Тип отходов"
        error = {Boolean(errors.TypeWaste?.message)}
        helperText={errors.TypeWaste?.message}
        {...register('TypeWaste', {required: 'Введите почту'})}
        fullWidth/> 

        <TextField
        className={styles.field}
        label="Ключ"
        error = {Boolean(errors.StationKey?.message)}
        helperText={errors.StationKey?.message}
        {...register('StationKey', {required: 'Введите ключ'})}
        fullWidth/>  

      <Button disabled={!isValid} type ="submit" size="large" variant="contained" fullWidth>
        Отправить
      </Button>
      </form>
      <div>
        <h3>{response !== undefined ? + response.payload.NewKgR + 'кг новой продукции будет произведено' : ""}</h3>
        <h3>{response !== undefined ? + response.payload.WeightReq + ' баллов начислено' : ""}</h3>

      </div>
    </Paper>
  ); 
};