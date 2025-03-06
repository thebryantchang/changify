import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/auth/index'
import Home from './components/home/index'
import SignUpForm from './components/auth/register'
import AddTaskPage from './components/home/addTask'

const router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='home' element={<Home/>}/>
                <Route path='register' element={<SignUpForm/>}/>
                <Route path='addTask' element={<AddTaskPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default router