import React, { useState } from 'react'
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import Modal from './Modal'
const ListItem = ({task,getData}) => {

  const [displayModal,setDisplayModal]=useState(false)

  const deleteTodo= async(e)=>{
    e.preventDefault()
    console.log('this method was triggred')
   try{
    const response=await fetch(`${process.env.REACT_APP_BASE_URI}/todos/${task.id}`,{
          method:'DELETE',
          headers:{'Content-Type':'application/json'},
          
        }
    
        )
       if(response.status===200){
        getData();
       }
   }
   catch(err){
    console.log(err)
   }
  }
  return (
    <div className='list-item'>
     <div className="info-container">
        <TickIcon />
        <p className='task-title'>{task.title}</p>
        <ProgressBar progress={task.progress}/>
     </div>
     <div className="btn-container">
        <button className="edit" onClick={()=>setDisplayModal(true)}>Edit</button>
        <button className='delete' onClick={deleteTodo}>Delete</button>
     </div>
       {displayModal && <Modal mode={'edit'} setDisplayModal={setDisplayModal} task={task} getData={getData}/> }
    </div>
  )
}

export default ListItem