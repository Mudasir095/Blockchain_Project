const mongoose=require('mongoose');

const schema=mongoose.Schema;
const userSchema=new schema({
    email:String,
    fullName:String,
    username:{
        type:String,
        unique:true
    },
    password:String
});

module.exports=mongoose.model('User',userSchema); 
