//import express for creating API's end points
const express=require("express");
const path=require("path");
const fs=require("fs");
const users=require("./databaase.json");
var database;
var token="wrong key";
//read database.json file
fs.readFile("database.json",function(err,data){
    //check for errors
    if(err) throw err;
    //converting into json
    database=JSON.parse(data);
});
//import jwt for API's end points authentication
const jwd=require("jsonwebtoken");
const app=express();

//a port for serving API's
const port=3000;

//allow json data
app.use(express.json());
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/login.html');
});

//login route
app.post("/auth",(req,res)=>{
    //get the name to the json body data
    const name=req.body.name;
    console.log(name);
    //get the password to the json body data
    const password=req.body.password;
    console.log(password);
    //make to varibles for further use
    let isPresent=false;
    let isPresentIndex=null;
    //iterate a loop to the data items and 
    //check what data are matched
    for(let i=0;i<database.length;i++){
        //if data name are matched so check
        //the password are correct or not 
        if(database[i].name===name&&database[i].password===password){
            //if both are correct so make 
            //isPresent variable
            isPresent=true;
            //and store the data index 
            isPresentIndex=i; 
            //break the loop after matching successfully
            break;
        }
    }
    //if isPresent is true then create a
    //token and pass to the response
    if(isPresent){
        //the jwt.sign method are used 
        //to create token
        const token=JsonWebTokenError.sign(database[isPresentIndex],"secret");
        //pass the data or token in response
        res.json({
            login:true,
            token:token,
            data:database[isPresentIndex],
        });
    }
    else{
        //if isPresent is false return error
        res.json({
            login:false,
            token:token,
            error:"please check name and password"
        });
    }
});
//verify route
app.post("/verifyToken",(req,res)=>{
    const token=req.body.token;
    //if the token is present 
    if(token){
        //verify the token using jwt.verify method
        const decode=jwd.verify(token,"secret");
        //return response with decode the data
        res.json({
            login:true,
            data:decode
        });
    }
    else{
        //return response with error
        res.json({
            login:false,
            data:error
        });
    }
});
app.post('/login',(req,res)=>{
    res.redirect("/login")
});
app.listen(port,()=>{
    console.log(`Servr is running:http://localhost:${port}/`)
});