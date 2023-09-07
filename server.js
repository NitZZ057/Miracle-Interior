import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import morgan from "morgan";
import { isAdmin, requireSignIn } from "./middlewares/authMiddleware.js";


dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(morgan("dev"))

//Routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/review',reviewRoutes);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`App running on ${PORT}`)
})