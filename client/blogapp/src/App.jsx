import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Comment from './pages/Comment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Others from './pages/Others'
import AddProfile from './pages/Addprofile'
import AddProf from './pages/AddProf'
import UserLiked from './pages/UserLiked'
import Messages from './pages/Messages'




function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <Router>
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/profile/:username' element={<Profile/>}/>
      <Route path='/post/:id' element={<Post/>}/>
      <Route path='/other/:id' element={<Others/>}/>
      <Route path='/reg' element={<Registration/>}/>
      <Route path='/user/liked' element={<UserLiked/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path=':id/comment' element={<Comment/>}/>
      <Route path='/addprof/:username' element={<AddProf/>}/>
      <Route path=':id/message' element={<Messages/>}/>


      

    </Routes>
    <ToastContainer/>
  </Router>

  </>
  )
}

export default App
