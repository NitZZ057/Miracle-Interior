import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import morgan from "morgan";
import { isAdmin, requireSignIn } from "./middlewares/authMiddleware.js";
import path from 'path';
import { fileURLToPath } from "url";


dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(morgan("dev"))


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname,'./client/build')))

//Routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/review',reviewRoutes);

app.use("*", function(req, res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
  });

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`App running on ${PORT}`)
})