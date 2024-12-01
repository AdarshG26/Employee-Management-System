const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./db')
const PORT = process.env.PORT || 3000

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const employeeRoutes = require('./routes/employeeRoutes') 



// app.get('/', (req, res)=> {
//     res.send('Employee Management server is ON');
// })

app.use('/employee', employeeRoutes)

app.listen(PORT, ()=> {
    console.log(`server listening to PORT ${PORT}`);
})
