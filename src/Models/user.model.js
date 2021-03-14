const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ReportSchema=Schema({
    problem:{type:String},
    time:{type:String},
    priority:{type:Number},
    lat:{type: String},
    long:{type: String},
    area:{type:String},
    actionTaken:{type:String}

})
const UserSchema=Schema({
    email:{type: String,required: true},
    password:{type: String,required: true},
    mobileno:{type: Number,required: true},
    name:{type: String},
    report:[ReportSchema],
    resetToken:{type: String,required: true}

})
const User=mongoose.model('User',UserSchema
)
module.exports=User
