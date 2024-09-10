import React, { useState } from 'react'
import './Reg.css'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import { addCustomer } from '../Api/allApi'
import { toast } from 'react-toastify'




function Registration() {

  const[getNewCustomer,setNewCustomer]=useState({
    first_name:"",last_name:"",email:"",username:"",password:""
  })

  const navigate = useNavigate();

  console.log(getNewCustomer);

  const formSubmit=(e)=>{

    e.preventDefault()

    const {first_name,last_name,email,username,password}=getNewCustomer
    if(!first_name || !last_name || !email || !username || !password){

      toast.warning("invalid data")

    }
    else{

        addCustomer(getNewCustomer).then(res=>{
        console.log(res.data);
        toast.success('success registration')
        setNewCustomer({first_name:"",last_name:"",email:"",username:"",password:""})
        navigate('/')
        
        
        
      })
    }


  }
  

  return (
    <div>
    <div className='main d-flex justify-content-center'>
    <div className="form-containerreg">
	<p className="title">socialise</p>
	<form className="form" method='post'>
		<div className="input-group">
			<label for="name">First_name</label>
			<input type="text" placeholder="" onChange={(e)=>(setNewCustomer({...getNewCustomer,first_name:e.target.value}))}/>
		</div>

		<div className="input-group">
			<label for="name">Last_name</label>
      <input type="text"  placeholder="" onChange={(e)=>(setNewCustomer({...getNewCustomer,last_name:e.target.value}))}/>
		</div>

    <div className="input-group">
			<label for="email">email</label>
			<input type="email"  placeholder="" onChange={(e)=>(setNewCustomer({...getNewCustomer,email:e.target.value}))}/>
		</div>

    <div className="input-group">
			<label for="username">Username</label>
			<input type="text"  placeholder="" onChange={(e)=>(setNewCustomer({...getNewCustomer,username:e.target.value}))}/>
		</div>

    <div className="input-group">
			<label for="password">Password</label>
			<input type="password"  placeholder="" onChange={(e)=>(setNewCustomer({...getNewCustomer,password:e.target.value}))}/>
		</div>
		<button className="sign mt-5" onClick={(e)=>formSubmit(e)}>Sign in</button>
	</form>
	

</div>
    </div>
    </div>
  )
}

export default Registration