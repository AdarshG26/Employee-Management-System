import { React, useEffect, useState } from 'react'
import EmployeeTable from './EmployeeTable'
import { getAllEmployees } from '../api'
import AddEmployee from './AddEmployee'
import { ToastContainer } from 'react-toastify'
import { notify } from '../utils'
import { deleteEmployeeById } from '../api'

const EmployeeMngmtApp = () => {

    const [showModal, setShowModal] = useState(false)

    const [updateEmpObj, setUpdateEmpObj] = useState(null)

    const [employeeData, setEmployeeData] = useState({
        "employees":[],
        "pagination": {
            "totalEmployees": 0,
            "currentPage": 1,
            "totalPages": 1,
            "pageSize": 5
        }
    })

    const fetchEmployees = async(search= '', page= 1, limit= 5)=> {
        try {
            const { data } = await getAllEmployees(search, page, limit)
            setEmployeeData(data);
        } catch (err) {
            console.log('Error', err);
        }
    }

    const handleAddEmployee = ()=> {
        setShowModal(true);
    }
    
    useEffect(()=> {
        fetchEmployees();
    }, [])

    const handleUpdateEmployee = (empObj)=> {
        console.log('Update obj', empObj);
        setUpdateEmpObj(empObj);
        setShowModal(true);
    }

    const handleDeleteEmployee = async(emp)=> {
        try {
            const { success, message } = await deleteEmployeeById(emp._id)
            if(success){
                notify(message, 'success')
            }else{
                notify(message, 'error')
            }
        } catch (err) {
            console.log('Error', err);
            notify(err, 'error');
        }
    }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
        <h1>Employee Management App</h1>
        <div className='w-100 d-flex justify-content-center'>
            <div className='w-80 border bg-light p-3' style={{width: '80%'}}>
                <div className='d-flex justify-content-between mb-3'>
                    <button className='btn btn-outline-primary'
                        onClick={()=> handleAddEmployee()}
                    > 
                        Add
                    </button>
                    <input 
                        type="text"
                        placeholder='Search Employee'
                        className='form-control w-50'
                    />
                </div>

                <EmployeeTable 
                    fetchEmployees = {fetchEmployees}
                    employees = {employeeData.employees}
                    pagination = {employeeData.pagination}
                    handleUpdateEmployee= {handleUpdateEmployee}
                    handleDeleteEmployee = {handleDeleteEmployee}
                />

                <AddEmployee 
                    showModal={showModal}
                    setShowModal={setShowModal}
                    fetchEmployees={fetchEmployees}
                    updateEmpObj= {updateEmpObj}
                />
            </div>
        </div>
        <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
        />
        
    </div>
  )
}

export default EmployeeMngmtApp