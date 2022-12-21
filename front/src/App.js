import {Routes, Route} from 'react-router-dom'
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from 'react-redux';
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, Points, Discounts, Recept, AddPoints, AddDiscounts, AllDiscounts} from "./pages";
import React from 'react';
import { selectIsAuth, fetchAuthMe } from './redux/slices/auth';
import { Receipt } from '@mui/icons-material';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  
  React.useEffect(() =>{
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="*" element={<Home/>}/>
          <Route path="/posts/:id" element={<FullPost />}/>
          <Route path="/posts/:id/edit" element={<AddPost />}/>
          <Route path="/addpost" element={<AddPost/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Registration/>}/>
          <Route path="/points" element={<Points/>}/>
          <Route path="/discounts" element={<Discounts/>}/>
          <Route path="/receptions" element={<Recept/>}/>
          <Route path="/addpoints" element={<AddPoints/>}/>
          <Route path="/adddiscounts" element={<AddDiscounts/>}/>
          <Route path="/alldiscounts" element={<AllDiscounts/>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
