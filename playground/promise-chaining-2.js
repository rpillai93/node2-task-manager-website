require('../src/db/mongoose')
const Task = require('../src/models/task')

// //5c99604953ed4520a0ca9a67
// Task.findByIdAndDelete({_id:'5c996387f015fa4d142e8fb6'}).then((task) => {
//                 console.log('Removed',task)
//                 return Task.countDocuments({ completed: true})
// }).then((result) =>  {
//
//         console.log(result)
// }).catch((e)   =>   {
//
//      console.log(e)
// })


const deleteTaskAndCount = async (id) => {

    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:true})
      return count


}


            deleteTaskAndCount('5c9922df4f314d437cda4195').then((count)=>{

              console.log(count)
            }).catch((e) => {

              console.log(e)
            })
