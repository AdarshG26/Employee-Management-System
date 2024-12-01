import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import EmployeeMngmtApp from './components/EmployeeMngmtApp'
import EmployeeDetails from './components/EmployeeDetails'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Navigate to='employee'/> } />
          <Route path='/employee' element={<EmployeeMngmtApp />} />
          <Route path='/employee/:id' element={<EmployeeDetails />} />
        </Routes>
      </BrowserRouter>      
    </>
  )
}

export default App
