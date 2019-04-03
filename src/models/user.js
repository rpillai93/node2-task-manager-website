const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
              }]
           })

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({_id: user._id.toString()},'thisismynewcourse')
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
const User = mongoose.model('User', userSchema)




module.exports = User
