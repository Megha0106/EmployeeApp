const express = require('express')
const app= express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require("./Employee")


app.use(bodyParser.json())
const Employee = mongoose.model("employee")


//password = qTAWE0qDeWCAICyd

const mongoUri = "mongodb+srv://cnq:qTAWE0qDeWCAICyd@cluster0.7zgaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("Connected to mongo db :)")
})
mongoose.connection.on("error",(err)=>{
    console.log("Error",err)
})
app.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        //console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post("/send-data",(req,res)=>{
    const employee = new Employee({
        Name:req.body.Name,
        Email:req.body.Email,
        Phone:req.body.Phone,
        Picture:req.body.Picture,
        Salary:req.body.Salary,
        Position:req.body.Position
        
    })
    employee.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
})

app.post("/delete",(req,res)=>{
    Employee.findByIdAndRemove(req.body._id)
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post("/update",(req,res)=>{
    Employee.findByIdAndUpdate(req.body._id,{
        Name:req.body.Name,
        Email:req.body.Email,
        Phone:req.body.Phone,
        Picture:req.body.Picture,
        Salary:req.body.Salary,
        Position:req.body.Position

    }).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})
app.listen(3000,()=>{
    console.log("Server running")
})


