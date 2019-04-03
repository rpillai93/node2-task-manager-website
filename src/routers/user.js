const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/users', async (req,res) =>{    //app.post can be replaced by app.get as well. This is to build the http 'post' or 'get' url
  const user = new User(req.body)
  try{
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({user,token})
   } catch(e) {
     res.status(400).send(e)

   }

})

 router.post('/users/login', async (req,res) => {
   try {
     const user = await User.findByCredentials(req.body.email,req.body.password)
     const token = await user.generateAuthToken()
     res.send({user,token})
   } catch(e) {
       res.status(400).send()
   }

 })

  router.post('/users/logout', auth, async(req,res) => {
        try {
                 req.user.tokens = req.user.tokens.filter((token) => {
                      return token.token !== req.token
                 })
                 await req.user.save()
                 res.send()
        } catch(e) {

          res.status(500).send()


        }


  })

  router.post('users/logoutAll', auth, async(req,res) => {
                try{
                      req.user.tokens = []
                      await req.user.save()
                      res.send()
                }catch(e) {
                      res.status(500).send()
                }

  })

router.get('/users/me', auth, async (req,res) =>{
       res.send(req.user)
})

router.get('/users/:id', async (req,res) =>{
const _id = req.params.id

        try{
       const user = await User.findById(_id)
        if(!user)
       return res.status(404).send()

       res.send(user)

        }catch(e){
          res.status(500).send()

        }

})

router.patch('/users/:id', async(req,res) => {     //update
         const updates = Object.keys(req.body) //converting object to array of strings
         const allowedUpdates = ['name','email','password','age']
         //checking if the update parameter entered by the user exists in the 'allowedUpdates' array:
         const isValidUpdate = updates.every((update)  => allowedUpdates.includes(update)) //every returns boolean return value
              if(!isValidUpdate){
                return res.status(400).send({error:'Invalid Updates!'})
              }



            try{
              const user = await User.findById(req.params.id)
              updates.forEach((update) => user[update] = req.body[update])
              await user.save()

              if(!user)
              return res.status(404).send()

              res.send(user)
            }catch(e){
                 res.status(400).send(e)
            }

})

router.delete('/users/:id', async(req, res) => {

             try{ const user = await User.findByIdAndDelete(req.params.id)
               if(!user)
               return res.status(404).send()

               res.send(user)
             }catch(e){ res.status(500).send(e)

             }

})
module.exports = router