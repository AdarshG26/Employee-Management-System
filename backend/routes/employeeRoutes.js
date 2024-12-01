const express = require('express')
const router = express.Router()

const { createEmployee, getAllEmployee, getEmployeeById, deleteById, updateEmployeeById } = require('../controllers/employeeController')
const { cloudinaryFileUploader } = require('../middlewares/fileUploader')

router.post('/', cloudinaryFileUploader.single('profileImage'), createEmployee)

router.get('/', getAllEmployee)

router.get('/:id', getEmployeeById)

router.put('/:id',cloudinaryFileUploader.single('profileImage'), updateEmployeeById)

router.delete('/:id', deleteById)

module.exports = router
