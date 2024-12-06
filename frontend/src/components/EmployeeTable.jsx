import React from 'react'
import { Link } from 'react-router-dom'

const EmployeeTable = ({employees, pagination, fetchEmployees, handleUpdateEmployee, handleDeleteEmployee}) => {
    const headers = ['Name', 'Email', 'Phone', 'Department', 'Actions'];
    const {currentPage, totalPages} = pagination;

    const TableRow = ({ employee })=> {
        return <tr>
            <td>
                <Link to={`/employee/${employee._id}`} className = 'text-decoration-none' /> {employee.name} <Link/>
            </td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.department}</td>
            <td>
                <i 
                    className='bi bi-pencil-fill text-success md-4'
                    role='button'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    onClick={()=> handleUpdateEmployee(employee)}
                >
                    
                </i>
                <i 
                    className='bi bi-trash-fill text-danger md-4 px-3'
                    role='button'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    onClick={()=> handleDeleteEmployee(employee)}
                >
                    
                </i>
            </td>
        </tr>
    }

const pageNumbers = Array.from({length: totalPages}, (_, index)=> index + 1)

const handlePagination = (currentPage)=> {
    fetchEmployees('', currentPage, 5)
}

const handleNextPage = ()=> {
    if(currentPage < totalPages){
        handlePagination(currentPage + 1)
    }
}

const handlePreviousPage = ()=> {
    if(currentPage > 1){
        handlePagination(currentPage - 1)
    }
}



  return (
    <>
        <table className='table table-striped'>
            <thead>
                <tr>
                    {
                        headers.map((header, i)=> {
                            return <th key={i}>{header}</th>
                        })
                    }
                </tr>
            </thead>

            <tbody>
                {
                    employees.map((emp)=> {
                        return <TableRow key={emp._id} employee={emp} />
                    })
                }
            </tbody>
        </table>

        <div className='d-flex justify-content-between align-items-center my-3'>
            <span className='badge text-bg-secondary px-4 py-3'> Page {currentPage} of {totalPages}</span>
            <div>
                <button 
                    className='btn btn-outline-primary me-1'
                    onClick={()=> handlePreviousPage()}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {
                    pageNumbers.map((page)=> {
                        return <button 
                                key={page}
                                className={`btn btn-outline-primary me-1 ${currentPage === page? 'active' : ''}`}
                                onClick={()=> handlePagination(page)}
                                >
                                    {page}
                                </button>
                    })
                }

                <button 
                    className='btn btn-outline-primary me-1'
                    onClick={()=> handleNextPage()}
                    disabled={totalPages === currentPage}
                >
                    Next
                </button>
            </div>
        </div>
    </>
  )
}


export default EmployeeTable