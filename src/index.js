const app = require('./app')

const port = process.env.PORT

app.listen(port, () => {  // this line listens to info on the particular port
  console.log('Server is up on port',port)
})
