import { Route, Routes } from 'react-router-dom'
import Contact from './component/Contact'
import Home from './component/Home'
import Dashboard from './component/Dashboard'
import StudentList from './component/StudentList'
import AddStudent from './component/AddStudent'
import UserList from './component/UserList'
import AddUser from './component/AddUser'


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

        {/* User Management Routes */}
        <Route path='/userList' element={<UserList />} />
        <Route path='/addUser' element={<AddUser />} />
        <Route path='/editUser/:id' element={<AddUser />} />

      </Routes>


    </>



  )
}

export default App
