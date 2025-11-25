import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './component/home'
import { Route, Routes } from 'react-router-dom'
import Contact from './component/Contact'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   

   <Routes>


    <Route path='/' element={<Home/>}/>
    <Route path='/contact' element={<Contact/>}/>

   </Routes>
   
    
    </>

      
    
  )
}

export default App
