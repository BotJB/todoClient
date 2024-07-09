import React from 'react'
import { useState } from 'react'
import {useCookies} from 'react-cookie'
import { url } from '../utils'
const Auth = () => {
  const [isLogIn,setIsLogin]=useState(true)
  const [cookies,setCookie,removeCookie]=useCookies(null)
  const [error,setError]=useState()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')

  

  const handleSubmit=async(e,route)=>{
  e.preventDefault()
  if(!isLogIn && password!==confirmPassword){
    setError('Please make sure the passswords are same')
    return
  }

 
  try{
    console.log('it is in the try block')
    const res=await fetch(`${url}/login`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email,password})
    })
    const data=await res.json()
    console.log(data)
    if(data.err){
      setError(data.err)
    }
    else{
      localStorage.setItem("EMAIL",data.user.email);
      localStorage.setItem("TOKEN",data.token)
      window.location.reload();
    }
  }
  catch(err){
    console.log(error)
  }

  }

  const changeStatus=(status)=>{
setError(null)
setIsLogin(status)
  }

  return (
    <div className='auth-container'>
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn?'Please Log In':'Please Sign Up'}</h2>
          <input type="email" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} />
          {!isLogIn&&<input type="password" placeholder='Re Enter your password please' onChange={(e)=>setConfirmPassword(e.target.value)} />}
          <input type="submit" className='create' onClick={(e)=>handleSubmit(e,isLogIn?'login':'signup')} />
          {error&&<p>{error}</p>}
        </form>
        <div className="auth-options">
           <button onClick={()=>changeStatus(true)} className='edit'>Log In</button>
           <button onClick={()=>changeStatus(false)} className='create'>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Auth