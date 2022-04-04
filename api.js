const express = require('express');
const bodyParser = require('body-parser');
const controller = require("./controller");
const Api_Response = require('./model/api_response');

const app = express();
const PORT = 5000;
app.use(bodyParser.json());
   
app.get("/api/users",(req,res)=>{
    let resData = controller.getUsers()
    if(resData.success){
        let api_response=new Api_Response(true,null,resData.data.rows);
        res.send(api_response)
    }
    else{
        res.status(404).send("Something went wrong!")
    }
});
app.post("/api/managers/available-managers",(req,res)=>{
    let resData = controller.getAvailableManagers(req.query.role);
    console.log(resData)
    if(resData.success){
        let api_response=new Api_Response(true,null,resData.data.rows);
    res.send(api_response)
    }
    else{
        res.status(404).send(resData)
    }
});
app.post("/api/user/create",(req,res)=>{
    let resData = controller.CreateUser(req.query.name,req.query.role,req.query.managerID)
    if(resData.success){
    res.send(resData)
    }
    else{
        res.status(404).send(resData)
    }
});
app.post("/api/user/immediateSub",(req,res)=>{
    let resData = controller.getImmediateSub(req.query.userID)
    if(resData.success){
        let api_response=new Api_Response(true,null,resData.data.rows);
        res.send(api_response)
    }
    else{
        res.status(404).send(resData)
    }
});
app.post("/api/user/allSub",(req,res)=>{
    let resData = controller.getAllSub(req.query.userID)
    if(resData.success){
        let api_response=new Api_Response(true,null,resData.data.rows);
        res.send(api_response)
    }
    else{
        res.status(404).send(resData)
    }
});
app.listen(PORT,()=> console.log(`App listening on port ${PORT}`));