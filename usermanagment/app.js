const user = require('./routers/register');
const auth = require('./routers/auth');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();


mongoose.connect('mongodb://127.0.0.1/DB',{ useNewUrlParser: true })
.then((data)=>console.log('Done'))
.catch((err)=>console.log('Connection Fail'))

app.use(express.json());
app.use('/api/users',user);
app.use('/api/auth',auth);



const port = process.env.PORT || 3000 ;
app.listen(port,()=>console.log(`listen on Port ${port}`))















//Schema
//  Collection  == Table 
//  Document    == raw 
// Schema Types
/* 
String - Number - Boolean - Date -Array - Buffer -ObjectID
*/ 


// const courseSchema = new mongoose.Schema({
//     name:String,
//     author:String,
//     price:Number,
//     date:{type:Date,default:Date.now()},
//     tags:[String],
//     isPublished:Boolean
// });

// // Model   
// const Course = new mongoose.model('Course',courseSchema);


// async function createCourse() {
// //Take Object 
// const course = new Course({
//     name:'Mean Stack',
//     author:'Emad Juha',
//     price:10,
//     tags:['back-end','front-end'],
//     isPublished:true
// })
// const result =await course.save();
// console.log(result);    
// }
// //createCourse();
// async function getCourses(){
//     const courses = await Course.find();
//     console.log(courses);
// }
// //getCourses();

// async function findOne(){
//     const course = await Course
//     .find({author:'Emad Juha'})
//     //.find({price:{$gte:50,$lte:40,$in[35,40,10] }})
//     //.and([{author:'Emad Juha'},{Price:10}])
//     //.or([{author:'Emad Juha'},{Price:10}])
//     .limit(5)
//     .sort({name:1})
//     .select({name:1});
//     console.log(course);
// }

// findOne();
// /**
//  * equal = eq
//  * not equal = ne
//  * greater than = gt
//  * greater than or equal to = gte
//  * less than = lt
//  * less than or equal to = lte
//  * in(25,30,40)  = in
//  * not in  = nin    
//  */