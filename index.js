import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { UserRegister } from "./controllers/User.js";
import UserRoutes from "./routes/User.js"


dotenv.config();

const app= express();
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use (express.urlencoded({extended:true}));


app.use("/api/user", UserRoutes);

//error handeler
app.use((err,req,res,next)=>{
    const status= err.status || 500;
    const message=err.message|| "Something went wrong.Please check";
    return res.status(status).json({
        success:false,
        status,
        message,
    });
})

app.get("/", async(req, res)=> {
    res.status(200).json({
        message:"Hello users",
    })
});


//connect the db
const connetDB = ()=> {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGODB_URL)
    .then ((res) => console.log("MONGODB successfully connected."))
    .catch((err) => {
        console.log(err);
    })

}


const startServer = async () => {
    try{
      connetDB()
        app.listen(8080, ()=> console.log("Server is running at port 8080."))

    }catch(err){
     console.log(err);
    }
}

startServer();