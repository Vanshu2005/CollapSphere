 const express=require("express");
 const authRouter=express.Router();
 const {validateSignUpData}=require("../utils/validation");
 const User=require("../models/user");
 const bcrypt=require("bcrypt");


authRouter.post("/signup",async(req,res)=>{ 
    try{
    validateSignUpData(req);

    const {firstName,lastName,emailId,password}=req.body;

    const passwordHash=await bcrypt.hash(password,10);
    console.log(req.body);
    console.log("password hash",passwordHash);
    const user=new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
    });

        const savedUser=await user.save();



         const token=await savedUser.getJWT();  
            res.cookie("token",token,{
                expires: new Date(Date.now()+8*3600000)
            });
            



    res.json({message: "User added successfully",data: savedUser});
    } catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
    
})

authRouter.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            // throw new Error("EmailId is not present in DB");
            throw new Error("Invalid Credentials");
        }
        // const isPasswordValid= await bcrypt.compare(password,user.password);
        const isPasswordValid=await user.validatePassword(password);

        if(isPasswordValid){
            // create a jwt token
            const token=await user.getJWT();
            // const token=await jwt.sign({_id:user._id},"DEV@TINDER",{expiresIn:"7d"})
            // add the token to cookie and send the response back to the user
            // console.log(token);
            res.cookie("token",token);

            // res.send("login successfull");
            res.send(user);
        }
        else{
            // throw new Error ("password is not correct");
            throw new Error("Invalid Credentials");
        }
    }
    catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),   
    });
    res.send("logout successful");
})

 module.exports=authRouter;     