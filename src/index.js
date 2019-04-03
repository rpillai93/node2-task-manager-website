const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//   if(req.method === 'GET'){
//       res.send('GET requests are disabled.')
//   } else{
//     next()
//   }
// })

// app.use((req,res,next) => {
//       const met = req.method
//       if(met ==='GET' || met==='POST' || met==='PATCH' || met==='DELETE')
//       res.status(503).send('Site under maintenance')
//
// })

app.use(express.json())    //this line uses any incoming json data
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {  // this line listens to info on the particular port
  console.log('Server is up on port',port)
})

const jwt = require('jsonwebtoken')
const myFunction = async () => {
    const token = jwt.sign({_id:'abc123'},'thisismynewcourse')
    console.log(token)
    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
  }

myFunction()
