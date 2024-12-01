const Employee = require('../models/employeeModel')

const createEmployee = async(req, res)=> {
    try {
        const data = req.body;

        const profileImage = req.file? req.file?.path : null
        data.profileImage = profileImage;

        const newEmployee = new Employee(data);

        newEmployee.createdAt = new Date();

        await newEmployee.save();

        console.log('Data saved');
        res.status(200).json({message: 'Employee created', success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal server error', success: false, error: err});
    }
}

const getAllEmployee = async(req, res)=> {
    try {
        // pagenation code
        let { page, limit, search } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;
         
        const skip = (page - 1) * limit;
        // page 1 => (1-1)*5 = 0 skip
        // page 2 => (2-1)*5 = 5 skip
        // page 3 => (3-1)*5 = 10 skip ....and so on

        //search criteria
        let searchCriteria = {}
        if(search){
            searchCriteria = {
                name: {
                    $regex: search,
                    $options: 'i'          // case insensitive    
                }
            }
        }

        const totalEmployees = await Employee.countDocuments(searchCriteria);

        const response = await Employee.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 })
        
        const totalPages = Math.ceil(totalEmployees / limit)

        console.log('Data fetched');
        res.status(200).json({
            message: 'All Employees',
            success: true,
                data: {
                    employees: response,
                    pagination: {
                        totalEmployees,
                        currentPage: page,
                        totalPages,
                        pageSize: limit
                    }
                }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal server error', success: false, error: err})
    }
}

const getEmployeeById = async(req, res)=> {
    try {
        const empId = req.params.id;
        const response = await Employee.find({_id: empId})
        console.log('Data fetched')
        res.status(200).json({message: 'Employee Details', success: true, data: response})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal server error', success: false, error: err})
    }
}

const updateEmployeeById = async(req, res)=> {
    try {
        const empId = req.params.id;

        const updatedEmp = req.body;
        updatedEmp.updatedAt = new Date()

        updatedEmp.profileImage = req.file? req.file?.path : null;

        const response = await Employee.findByIdAndUpdate(empId, updatedEmp, {
            new: true,
            runValidators: true
        })

        if(!response){
            res.status(404).json({message: 'Employee not found'})
        }

        console.log('Data updated');
        res.status(200).json({message: 'Employee updated successfully', succes: true, data: response})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal server error', succes: false, error: err})
    }
}

const deleteById = async(req, res)=> {
    try {
        const empId = req.params.id;
        const response = await Employee.findByIdAndDelete({_id: empId});

        if(!response){
            res.status(404).json({message: 'Employee not found'})
        }

        console.log('Data deleted');
        res.status(200).json({message: 'Employee deleted successfully', succes: true})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal server error', succes: false, error: err})
    }
}

module.exports = { createEmployee, getAllEmployee, getEmployeeById, updateEmployeeById, deleteById }
