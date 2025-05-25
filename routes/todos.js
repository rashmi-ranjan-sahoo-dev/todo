require('dotenv').config(); // Load .env

const express = require("express");
const TodoRoute = express.Router();

TodoRoute.post("/todo",function(req,res){

})

TodoRoute.get("/todos",function(req,res){
    
})

TodoRoute.put("/todo",function(req,res){

})

TodoRoute.delete("/todo",function(req,res){
    
})

module.exports = {
    TodoRoute
}