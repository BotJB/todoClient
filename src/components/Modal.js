import React,{useState} from 'react'
import { useCookies } from 'react-cookie'
const Modal = ({mode,setDisplayModal,task,getData}) => {
    const [cookies,setCookie,removeCookie]=useCookies(null)
    const editMode=mode==='edit'?true:false
    const [data,setData]=useState({
        email:task?task.email:cookies.EMAIL,
        title:task?task.title:null,
        progress:task?task.progress:"50",
        date:editMode?task.date:new Date()
    })


    console.log(editMode)

    //this is to post data to the server

    const postData=async(e)=>{
      e.preventDefault()
const res=await fetch(`${process.env.REACT_APP_BASE_URI}/todos`,{
  method:"POST",
 headers:{'Content-Type':'application/json'},
 body:JSON.stringify(data)

})
if(res.status===200){
  setDisplayModal(false)
  getData();
}
    }

    //function to update the data
    const editData=async(e)=>{

      e.preventDefault()
      try{
        const response=await fetch(`${process.env.REACT_APP_BASE_URI}/todos/${task.id}`,{
          method:'PUT',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(data)
        }
      
        )
        console.log(response)

        if(response.status===200){
          setDisplayModal(false)
          getData()
        }

      }
      catch(err){
          console.error(err)
      }
    }

    const handleChange=(e)=>{
  const {name,value}=e.target
  setData(prev=>({
    ...prev,
    [name]:value
  }))
  console.log(data)
    }

  return (
    <div className='overlay'>
        <div className='modal'>
            <div className="form-title-container">
                <h3>Let's {mode} your task </h3>
                <p onClick={()=>setDisplayModal(false)}>X</p>
            </div>
            <form>
                <input type="text"
                required
                placeholder='Enter your task here'
                name='title'
                value={data.title}
                onChange={handleChange} />
                <label for="range"></label>
                <input type="range"
                required
                min='0'
                id='range'
                max='100'
                value={data.progress}
                onChange={handleChange}
                name='progress' />
                <input type="submit"
                className={mode} onClick={editMode?editData:postData}/>
            </form>
        </div>
    </div>
  )
}

export default Modal