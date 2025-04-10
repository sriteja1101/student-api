import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import Student from '../modules/students.js';
import students from '../modules/students.js';
const app=express();
app.use(express.json())
async function connectTODatabase(){
    try{
        const connecttoDB= await mongoose.connect(process.env.MONGODB_URL);
        
        console.log("Database Connection Successful!")
    }catch(error){
        console.log("connection unsuccessfull")
        console.log('MONGODB_URL from .env:', process.env.MONGODB_URL);
    }
}
connectTODatabase()

app.post("/students",async (req,res)=>{
    const {name,age,department}=req.body;
    const createStudent = await Student.create(
        {
            name,age,department
        }
    );
    res.json({
        "Details":createStudent
    })
})
app.get("/students/:id",async(req,res)=>{
    try {
        const studentDatils=await Student.findById(req.params.id); 
        res.json(studentDatils);
    } catch (error) {
        res.send(error)
    }

})
app.put("/students/:id",async(req,res)=>{
    try {
        const {name,age,department}= req.body;
        const studentDetails=await Student.findByIdAndUpdate((req.params.id),{
            name:name,
            age:age,
            department:department,
        },
            {
                returnOriginal:false
            }
         
        )
       
        res.json(studentDetails)
    } catch (error) {
        console.log("failed")
    }
})
app.delete("/students/:id",async(req,res)=>{
    try {
        const studentDatils=await Student.findByIdAndDelete(req.params.id); 
        res.json({"message":"data cleared successful",studentDatils});
    } catch (error) {
        res.send(error)
    }

})


const PORT=5000
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
   
})