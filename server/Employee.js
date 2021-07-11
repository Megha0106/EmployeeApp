const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
    Name:String,
    Email:String,
    Phone:String,
    Picture:String,
    Salary:String,
    Position:String
})

mongoose.model("employee",EmployeeSchema)