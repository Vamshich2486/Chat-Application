import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import cors from "cors";

const __dirname = path.resolve();

dotenv.config();

app.use(cors());

const PORT = process.env.PORT || 4000;


app.use(express.json()); //to parse the incoming requests with JSON payloads(from req.body)
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"/frontend","dist","index.html"))
})



server.listen(PORT,() => {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`)});



