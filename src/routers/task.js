const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req,res) =>{    //app.post can be replaced by app.get as well. This is to build the http 'post' or 'get' url
  const task = new Task(req.body)

  try {  await task.save()
    res.status(201).send(task)

  }catch(e){
    res.status(400).send(e)

  }

})


router.get('/tasks', async (req,res) => {

  try {
    const tasks  = await Task.find({})
    res.send(tasks)
  }
  catch(e){
    res.status(500).send()
  }

})

router.get('/tasks/:id', async (req,res) =>{

const _id = req.params.id
try {

         const task = await Task.findById(_id)
         if(!task){
           return res.status(404).send()
         }

         res.send(task)
}catch(e){
  res.status(500).send()
}


})



router.patch('/tasks/:id', async(req,res) =>{
  const updates = Object.keys(req.body)
  const validTaskUpdates = ['description','completed']
  const UpdateCheckResult = updates.every((update) => validTaskUpdates.includes(update)) //returns Boolean
  if(!UpdateCheckResult)
  {
    return res.status(400).send({error: 'Invalid Updates!'})
  }

  try{
    const task = await Task.findById(req.params.id)
    updates.forEach((update) => task[update] = req.body[update])
    await task.save()
  
    if(!task)
    return res.status(404).send()

    res.send(task)
  }catch(e){
       res.status(400).send(e)
  }


})


router.delete('/tasks/:id', async(req, res) => {

             try{ const task = await Task.findByIdAndDelete(req.params.id)
               if(!task)
               return res.status(404).send()

               res.send(task)
             }catch(e){ res.status(500).send(e)

             }

})
module.exports = router