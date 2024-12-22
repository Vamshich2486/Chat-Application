import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req,res)=>{
   try {
      const {fullName,username,password,confirmPassword,gender} = req.body;

      if(password !== confirmPassword) {
        return res.status(400).json({error:"Passwords don't match"})
      }

      const user = await User.findOne({username});

      if(user){
        return res.status(400).json({error:"newUsername already exists"})
      }

     //Hash password here
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt);

     //https://avatar-placeholder.iran.liara.run/

     const boyProfilePic = `https://avatar.iran.liara.run/public/boy?newUsername=${username}`
     const girlProfilePic = `https://avatar.iran.liara.run/public/girl?newUsername=${username}`

     const newUser = new User({
        fullName,
        username,
        password:hashedPassword,
        gender,
        profilepic: gender === "male" ? boyProfilePic : girlProfilePic
     })
    
     if(newUser){
      // Generate JWT token here
     generateTokenAndSetCookie(newUser._id,res);
     await newUser.save();

     res.status(201).json({
        _id: newUser._id,
        fullName:newUser.fullName,
        newUsername:newUser.username,
        profilepic:newUser.profilepic
     });
   } else{
      res.status(400).json({error: "Invalid newUser data"});
   }  

   } catch (error) {
    console.log("Error in signup controller",error.message)
       res.status(500).json({error:"Internal Server Error"})
   }
}

export const login = async(req,res)=>{
   try {
      const {username,password} = req.body;
      const user = await User.findOne({username});
      const isPasswordCorrect = await bcrypt.compare(password,user?.password||"");

      if(!user || !isPasswordCorrect) {
         return res.status(400).json({error: "Invalid Credentials"});
      }

      generateTokenAndSetCookie(user._id, res);

      res.status(200).json({
         _id: user._id,
         fullName:user.fullName,
         username:user.username,
         profilepic:user.profilepic
      });

   } catch (error) {
      console.log("Error in signup controller",error.message)
      res.status(500).json({error:"Internal Server Error"})
   }
}

export const logout = async(req,res)=>{
    try {
      res.cookie("jwt","",{maxAge: 0});
      res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
      console.log("Error in signup controller",error.message);
      res.status(500).json({error:"Internal Server Error"});
   }
}
