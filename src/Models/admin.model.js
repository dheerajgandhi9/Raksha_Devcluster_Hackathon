const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ComplainSchema=Schema({
    type:{type:String,required:true},
    discription:{type:String,required:true},
    date:{type:Date},
    lat:{type:String,required:true},
    long:{type:String,required:true},
    area:{type:String,required:true},
    city:{type:String,required:true}


})
const AuthoritySchema=Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    specialId:{type:String,required:true},
    level:{type:Number,required:true},
    mobileNumber:{type:Number,required:true},
    policestation:{type:String},
    complain:[ComplainSchema],
    dangerZone:{type:Number,required:true},
    resetToken:{type:String,required:true},
    area:{type:String,required:true},
    city:{type:String,required:true},
    lat:{type:String,required:true},
    long:{type:String,required:true}

})
const Authority=mongoose.model('Authority',AuthoritySchema)
module.exports =Authority
