require('../src/db/mongoose')
const User = require('../src/models/user')

//5c99604953ed4520a0ca9a67
// User.findByIdAndUpdate('5c995e94d6a3de24c093396f',{ age: 1}).then((user) => {
//                 console.log(user)
//                 return User.countDocuments({ age: 1})
// }).then((result) =>  {
//
//         console.log(result)
// }).catch((e)   =>   {
//
//      console.log(e)
// })

const updateAgeCount = async(id, age) =>  {

  const user = await User.findByIdAndUpdate(id, {age} )
  const count = await User.countDocuments( {age})
  return count
}

updateAgeCount('5c995e94d6a3de24c093396f',2).then((count)=>{
         console.log(count)

}).catch((e)  => {

     console.log(e)
})
