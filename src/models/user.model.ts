import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    userType:{
        type:String,
        required:true,
        default:"employee"
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:false,
    }
},{
    timestamps:true
})


// if the users model exists then delete the model

if(mongoose.models.users){
    const userModel = mongoose.model("users");
    mongoose.deleteModel(userModel.modelName)
}


// create the model
const User = mongoose.model('users', userSchema);
export default User;
