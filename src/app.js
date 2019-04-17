const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()



app.use(express.json())    //this line uses any incoming json data
app.use(userRouter)
app.use(taskRouter)


module.exports = app
