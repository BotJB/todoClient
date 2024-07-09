import { useEffect,useState } from 'react';
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth';
import {useCookies} from 'react-cookie'
import {url} from './utils'

function App() {
  const email = localStorage.getItem('EMAIL');
  const authToken = localStorage.getItem('TOKEN');
  

  console.log("the email customer is logged with "+url)
  const [tasks,setTasks]=useState(null)

  //function to get the data
   
    const getData=async()=>{
      try{
    const res=await fetch(`${url}/todos/${email}`,{
      method:'GET',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify()
    })
    console.log(`${process.env.REACT_APP_BASE_URI}/todos/${email}`)
    const json=await res.json()
    console.log(json)
    setTasks(json.todos)
  }  catch(err){
    console.log(err)
  }
}
 
  useEffect(()=>{ 
    getData();
   },[])

// const sortedTasks=tasks?.sort((a,b)=>(new Date(a.date)-new Date(b.date)))
// console.log(sortedTasks)
  return (
    <div className="App">
      {authToken && <p>Welcome {email}</p>}
      {!authToken && <Auth />}
   {authToken &&<> <ListHeader listHeading={'Work Todo list'} getData={getData} email={email}/>
    {tasks?.map((task=>{
      return (
        <ListItem key={task._id} task={task} getData={getData} email={email} />
      )
    }))}</>}

   
    </div>
  );
}

export default App;
