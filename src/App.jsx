import { Route, Routes } from 'react-router-dom'
import Contact from './component/Contact'
import Home from './component/Home'
import DashBoard from './component/DashBoard'
import StudentList from './component/StudentList'


function App() {

  return (
    <>


      <Routes>


        <Route path='/studentList' element={<StudentList />} >

        </Route>
        <Route path='/Home' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/dashboard' element={<DashBoard />} />



      </Routes>


    </>



  )
}

export default App
