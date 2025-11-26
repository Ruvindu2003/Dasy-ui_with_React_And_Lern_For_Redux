import { Route, Routes } from 'react-router-dom'
import Contact from './component/Contact'
import Home from './component/Home'
import Dashboard from './component/Dashboard'
import StudentList from './component/StudentList'
import AddStudent from './component/AddStudent'


function App() {

  return (
    <>


      <Routes>

        {/* Default root route */}
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/studentList' element={<StudentList />} />
        <Route path='/addStudent' element={<AddStudent />} />

      </Routes>


    </>



  )
}

export default App
