import { useEffect,useState } from 'react';
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth';
import {useCookies} from 'react-cookie'

function App() {
  const [cookies,setCookie,removeCookie]=useCookies()
  
  const email=cookies.EMAIL
  console.log(email)
  const [tasks,setTasks]=useState(null)
  const authToken=cookies.TOKEN;

  console.log(process.env.REACT_APP_BASE_URI)
  //function to get the data
   
    const getData=async()=>{
      try{
    const res=await fetch(`${process.env.REACT_APP_BASE_URI}/todos/${email}`)
    console.log(`${process.env.REACT_APP_BASE_URI}/todos/${email}`)
    const json=await res.json()
    setTasks(json)
  }  catch(err){
    console.log(err)
  }
}
 
  useEffect(()=>{ 
    getData();
   },[])

const sortedTasks=tasks?.sort((a,b)=>(new Date(a.date)-new Date(b.date)))
console.log(sortedTasks)
  return (
    <div className="App">
      {authToken && <p>Welcome {email}</p>}
      {!authToken && <Auth />}
   {authToken &&<> <ListHeader listHeading={'Work Todo list'} getData={getData} email={email}/>
    {sortedTasks?.map((task=>{
      return (
        <ListItem key={task.id} task={task} getData={getData} email={email} />
      )
    }))}</>}

   
    </div>
  );
}

export default App;
