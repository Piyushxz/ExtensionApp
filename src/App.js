import { images } from './db/images';
import './App.css';
import {Home} from "./pages/Home/Home.js"
import { useBrowser } from './context/browser-context.js';
import { Task } from './pages/Task/Task.jsx';
import { useEffect } from 'react';
  

const index = Math.floor(Math.random()*images.length);
const bgImg = images[index].image;
function App() {
  const {name,browserDispatch}= useBrowser();
  
useEffect(()=>{
  const username = localStorage.getItem("name");
  browserDispatch({
    type:"NAME",
    payload:username
  })
},[])

  return (
    <div className="app" style = {{backgroundImage : `URL("${bgImg}")`}}>
     { name ? <Task/> : <Home/>}
    </div>
  );
}

export default App;
