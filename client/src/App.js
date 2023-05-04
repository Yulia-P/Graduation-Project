import {Layout} from './components/Layout.jsx'
import {Routes, Route} from 'react-router-dom'
import {MainPage} from './pages/MainPage.jsx'
import {ArticlePage} from './pages/ArticlePage.jsx'
import {AddArticlesPage} from './pages/AddArticlesPage.jsx'
import {RegisterPage} from "./pages/RegisterPage";
import {LoginPage} from "./pages/LoginPage";
import {PointPage} from "./pages/PointPage.jsx";
import {UpdateArticlesPage} from "./pages/UpdateArticlesPage";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import { getMe, setIsAuth } from './redux/features/auth/authSlice.js'
import {MyDiscountPage} from "./pages/MyDiscountPage";
import {MarksPage} from "./pages/MarksPage";
import {ReceptionPage} from "./pages/ReceptionPage";
import {AllDiscointPage} from "./pages/AllDiscointPage";
import {AddPointPage} from "./pages/AddPointPage";
import {AddSecretKeyPage} from "./pages/AddSecretKeyPage";
import {AddDisсountPage} from "./pages/AddDisсountPage";
import {AddMarksPage} from "./pages/AddMarksPage";
import {AddWeightPage} from "./pages/AddWeightPage";
import {UpdatePointPage} from "./pages/UpdatePointPage";
import {UpdatePointKeyPage} from "./pages/UpdatePointKeyPage";
import {UpdateDiscountPage} from "./pages/UpdateDiscountPage";
import {UpdateMarkPage} from "./pages/UpdateMarkPage";
import {Wrapper} from "./components/Wrapper";
import {Header} from "./components/Header";
import {AllArticlesPage} from "./pages/AllArticlesPage";

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
    // <Layout>
        <Wrapper>
            <Header/>
            <Routes>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='register' element={<RegisterPage/>}/>
                <Route path='/' element={<MainPage/>}/>
                <Route path='articles' element={<AllArticlesPage/>}/>
                <Route path='new' element={<AddArticlesPage/>}/>
                <Route path=':id' element={<ArticlePage/>}/>
                <Route path=':id/edit' element={<UpdateArticlesPage/>}/>
                <Route path='reception' element={<ReceptionPage/>}/>

                <Route path='mark' element={<MarksPage/>}/>
                <Route path='newmark' element={<AddMarksPage/>}/>
                <Route path='newweight' element={<AddWeightPage/>}/>


                <Route path='point' element={<PointPage/>}/>
                <Route path='newpoint' element={<AddPointPage/>}/>
                <Route path='newkey' element={<AddSecretKeyPage/>}/>


                <Route path='mydiscount' element={<MyDiscountPage/>}/>
                <Route path='alldisсount' element={<AllDiscointPage/>}/>
                <Route path='newdisсount' element={<AddDisсountPage/>}/>

                {/*<Route path=':id/editpoint' element={<UpdatePointPage/>}/>*/}
                {/*<Route path=':id/editpointk' element={<UpdatePointKeyPage/>}/>*/}
                {/*<Route path=':id/editdiscount' element={<UpdateDiscountPage/>}/>*/}
                {/*<Route path=':id/editmark' element={<UpdateMarkPage/>}/>*/}

            </Routes>
            <ToastContainer position='bottom-right' />
        </Wrapper>

     // </Layout>
    );
}

export default App;
