import React,{useState} from 'react'
import Modal from './Modal'
import '../index.css'
import {useCookies} from 'react-cookie'

const ListHeader=({listHeading,getData,email})=>{
    const[displayModal,setDisplayModal]=useState(false)
    const signOut=()=>{
        localStorage.removeItem("EMAIL")
    localStorage.removeItem('TOKEN')
    window.location.reload()
    }
return(
    <div className='list-header'>
<h1>{listHeading}</h1>
<div className="btn-container">
    <button className='create'onClick={()=>setDisplayModal(true)} >Add New</button>
    <button className='sign-out-btn' onClick={signOut} >Sign Out</button>
</div>
{displayModal &&<Modal mode={'create'} setDisplayModal={setDisplayModal} getData={getData}/>}
</div>
)
}

export default ListHeader