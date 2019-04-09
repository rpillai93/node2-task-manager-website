const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT 


app.use(express.json())    //this line uses any incoming json data
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {  // this line listens to info on the particular port
  console.log('Server is up on port',port)
})
