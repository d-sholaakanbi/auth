require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3500
const mongoose = require("mongoose");
const notFound = require("./middleware/notfound")
// const userRouter = require("./routes/userRoutes")
const newRouter = require("./routes/newUserRouter")
app.set('view engine', 'ejs')
mongoose.set("strictQuery", true);



// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ROUTES
app.use(newRouter);

app.get("/register",(req,res)=>{
    res.render('Signup')
})

app.get("/login",(req,res)=>{
    res.render('login')
})

app.get("/dashboard",(req,res)=>{
    res.render('dashboard')
})

//ERROR ROUTE 
app.use(notFound)



const start = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`server running on ${PORT}...`);
        });
    } catch(err){
        console.log(err);
    }
}

start()