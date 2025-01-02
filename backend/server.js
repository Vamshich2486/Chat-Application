import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";



dotenv.config();

const PORT = process.env.PORT || 4000;


app.use(express.json()); //to parse the incoming requests with JSON payloads(from req.body)
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
app.use("/api/users",userRoutes);

// app.get("/",(req,res)=> {
//     //root route http://localhost:4000/
//     res.send("hello! world");
// });



server.listen(PORT,() => {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`)});



