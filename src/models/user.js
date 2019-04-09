const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const dotenv=require('dotenv').config()
const userSchema = new mongoose.Schema({
           name:{
             type: String,
             required:true
           },
           email: {
             type: String,
             unique:true,
             required:true,
             trim:true,
             lowercase:true,
             validate(value){
                  if(!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                  }
             }
           },
           age:{
              type: Number,
              default:0,
              validate(value) {
                  if(value<0){
                    throw new Error('Age must be a positive number')
                  }
              }
            },
              password:{
                type:String,
                required:true,
                trim:true,
              minlength: 7,
                validate(value){  if(value.toLowerCase().includes('password'))
                  throw new Error('Please enter a more secure password')
                }
              },
              tokens:[{
                token: {
                  type : String,
                  required: true
                }
              }],
              avatar:  {
                     type: Buffer  //allows us to store the buffer with a binary image data in the database along with the user
              }
           } , {
             timestamps: true
           })

 userSchema.virtual('tasks',{   //the virtual file is just for mongoose to understand relationships.
      ref:'Task',
      localField:'_id',
      foreignField:'owner'
 })

 userSchema.methods.toJSON = function () {
            const user = this
            const userObject = user.toObject()
            delete userObject.password
            delete userObject.tokens
            delete userObject.avatar
            return userObject

}
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({token})
  await user.save()

  return token

}

userSchema.statics.findByCredentials = async (email,password) =>  {
                     const user = await User.findOne({email})
                     if(!user){
                       throw new Error('Unable to login as the user does not exist.')
                     }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
        throw new Error('Unable to login as username and password do not match.')

        return user

}

//plain text password hashing before saving
userSchema.pre('save', async function(next) {    //pre and post are middleware functions
                       const user = this
                      if (user.isModified('password')) {
                              user.password = await bcrypt.hash(user.password,8)
                      }

                       next() //next is called to say that the code is done, so now the user can be saved.
})

// Delete user tasks when user is removed:
userSchema.pre('remove', async function(next) {
     const user = this
     await Task.deleteMany({ owner: user._id})                   //delete every task associated with the owner

     next()

})
const User = mongoose.model('User', userSchema)




module.exports = User
