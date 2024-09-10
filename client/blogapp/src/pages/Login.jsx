import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { getToken } from '../Api/allApi'
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'





function Login() {
  const navigate=useNavigate()

  const [loginData,setLoginData] =useState({
    username:"",password:""
  })

  const getLoginData=(e)=>{
    e.preventDefault()
    const {username,password}=loginData
    const uname=username
    console.log(uname);
    sessionStorage.setItem("username",uname)
    
    
    

    if(!username || !password){

      toast.error('invalid data')
      
    }

    else{
      
      getToken(loginData).then(res=>{
        sessionStorage.setItem("token",res.data.token)
        
 
       
      toast.success('login success')
      navigate('home')



      })
    }


    
  }



  return (

    <div className='container d-flex justify-content-center align-items-center' style={{height:'100vh'}}>


<div className="form-container">
	<p className="title">socialise</p>
	<form className="form" method='post'>
		<div className="input-group">
			<label for="username">Username</label>
			<input type="text" id="username" placeholder="" onChange={(e)=>(setLoginData({...loginData,username:e.target.value}))}/>
		</div>
		<div className="input-group">
			<label for="password">Password</label>
      <input type="password" id="password" placeholder="" onChange={(e)=>(setLoginData({...loginData,password:e.target.value}))}/>
			
			
		</div>
		<button className="sign mt-5" onClick={getLoginData}>Sign in</button>
	</form>
	
	<p className="signup mt-3">Don't have an account?
  <Link to={'/reg'}>Not a user?</Link>
	</p>
</div>
     


       
    </div>




  )
}

export default Login