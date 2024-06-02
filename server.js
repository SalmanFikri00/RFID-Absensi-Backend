import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from './routes/user.routes.js'
import moduleRoutes from './routes/module.routes.js'
import appRoutes from './routes/app.routes.js'
import mongoose from 'mongoose';
import bodyParser from "body-parser"
import connectDB from './config/connstDB.js';
const port = process.env.PORT || 5000
import cookieParser from 'cookie-parser';
const app = express()
import cors from 'cors'

//wajibe

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  }));



//Nambahin Route Dari folder routes
app.use('/', moduleRoutes)
app.use('/users', userRoutes)
app.use('/app', appRoutes)


<<<<<<< HEAD

=======
>>>>>>> 2108f3aad54b8fbbdc655883a0433560f3b01585
app.get("/", (req, res) => {
    res.send("server ready");
});

app.listen(port, () => {
    console.log(`server listen on port : ${port}`);
});

connectDB();