import mongoose, { Schema } from "mongoose"


const userSchema = new Schema({
    name:{
    type:String,
    default:"user"
    },
   username:{
    type:String,
    required:[true,"Please provide your username"],
    unique:true
   },
   email:{
    type:String,
    required:[true,"Please provide your email"],
    unique:true
   },
   password:{
    type:String,
    required:[true,"Please Enter your password"]
   },
   profilePic:{
    type:String,
    default:"",
   }
},
{timestamps:true}
);

const User = mongoose.model('User',userSchema);
export default User;

