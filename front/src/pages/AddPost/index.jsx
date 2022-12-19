import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector} from 'react-redux';
import { useNavigate, Navigate, useParams } from "react-router-dom";
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectIsAuth } from "../../redux/slices/auth";
import axios from '../../axios';
import { StepContext } from '@mui/material';


export const AddPost = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [Text, setText] = React.useState('');
  const [Title, setTitle] = React.useState('');
  const [ImageU, setImageUrl] = React.useState('');
  // const userData = useSelector((state) => state.auth.data);

  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const {data} = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при загрузке картинки');
    } 
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async() => {
    try {
      setLoading(true);
      const fields ={
        Title,
        Text,
        ImageU
      }
      const { data } = isEditing 
      ? await axios.put(`/Articles/${id}`, fields) 
      : await axios.post('/Articles', fields);

      navigate(`/posts`);


    } catch (error) {
      console.warn(error);
      alert('Ошибка при создании статьи');
    }
  };

  React.useEffect(() => {
    if (id){
      axios.get(`/Articles/${id}`).then(({data}) => {
        setTitle(data.Title);
        setText(data.Text);
        setImageUrl(data.ImageU);
      }).catch(err => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
    }
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('accessToken') && !isAuth) {
    return <Navigate to="*" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {ImageU && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
        <img className={styles.image} src={`http://localhost:8082${ImageU}`} alt="Uploaded" />

        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      {/* <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Тэги" fullWidth /> */}
      <SimpleMDE className={styles.editor} value={Text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
       {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};