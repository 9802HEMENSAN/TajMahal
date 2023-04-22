const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('mongoose-type-email');
const userSchema = mongoose.Schema({
    name :{type:String, required:true},
    email : {type: mongoose.SchemaTypes.Email, required: true},
    password : {type:String, required:true}
})



userSchema.pre('save',async function(next){

    if(this.isModified('password')){
     this.password = await bcrypt.hash(this.password,10);
    
    }
     next();
 });
 

const UserModel = mongoose.model("user" , userSchema)
module.exports ={UserModel}