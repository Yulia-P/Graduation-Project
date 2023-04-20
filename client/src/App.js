import {Layout} from './components/Layout.jsx'
import {Routes, Route} from 'react-router-dom'
import {MainPage} from './pages/MainPage.jsx'
import {ArticlePage} from './pages/ArticlePage.jsx'
import {AddArticlesPage} from './pages/AddArticlesPage.jsx'
import {RegisterPage} from "./pages/RegisterPage";
import {LoginPage} from "./pages/LoginPage";
import {UpdateArticlesPage} from "./pages/UpdateArticlesPage";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import { getMe, setIsAuth } from './redux/features/auth/authSlice.js'

function App() {

    const dispatch = useDispatch()

    const isAuth = () => {
        return window.localStorage.getItem('accessToken')
    }

    console.log(isAuth())

    useEffect(() => {
        dispatch(getMe())
        // dispatch(setIsAuth(isAuth()))
        dispatch(setIsAuth(isAuth()))
        console.log('1')
    }, [dispatch])

  return (
    <Layout>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path=':id' element={<ArticlePage/>}/>
          <Route path=':id/edit' element={<UpdateArticlesPage/>}/>
          <Route path='new' element={<AddArticlesPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
        </Routes>
        <ToastContainer position='bottom-right' />
     </Layout>
    );
}

export default App;
