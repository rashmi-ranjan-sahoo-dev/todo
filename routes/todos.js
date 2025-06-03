require('dotenv').config(); // Load .env

const express = require("express");
const TodoRoute = express.Router();
const {z} = require("zod");
const { todoModel } = require("../db");
const { auth } = require("../middleware")


TodoRoute.post("/todo",auth, async function(req,res){
    const validedData = z.object({
        title:z.string(),
        detail:z.string(),
        isDone:z.boolean()
    })

    const parsed = validedData.safeParse(req.body)

    if(!parsed.success){
        res.json({
            msg:"incorrect format",
            error:parsed.error
        })
        return
    }

    const { title, detail, isDone} = req.body
    const userId = req.userId;

    try{
        const todo = await todoModel.create({
            userId:userId,
            title:title,
            detail:detail,
            isDone:isDone
        });

        console.log(todo);
         res.status(201).json({ msg: "Todo Created", todo });
    }catch(error){

    console.error("Error during user signup:", error);
    res.status(500).json({
        message: "Todo Not Created",
        error: error.message
    });
   }

})

TodoRoute.get("/todos",auth, async function(req,res){
    const userId = req.userId;
    console.log(userId);
   try{
    const todos = await todoModel.find({
        userId:userId
    })
 
      if (todos.length === 0) {
            return res.status(404).json({ msg: "No todos found" });
        }

        console.log(todos)

       res.json({
        todos
    })
}catch (error) {
        res.status(500).json({ msg: "Error fetching todos", error: error.message });
    }
})

TodoRoute.put("/todo",auth,async function(req,res){
     const userId = req.userId;
     const {title, detail, isDone, todoId } = req.body;

     console.log(title);
     console.log(detail);
     console.log(isDone);
     console.log(todoId);

    if(!todoId || !title || typeof isDone === "undefined"){
        return res.status(400).json({
            msg:"missing or invalid data"
        })
    }

    try{
        const todo = await todoModel.findOneAndUpdate(
            {_id: todoId, userId}, // filter
            { title, detail, isDone }, // Update
            { new: true }// Return update doc
        );
        if(!todo){
            return res.status(404).json({
                msg: "Todo not found of unauthorized"})
        }

        res.status(200).json({
            msg: "todo upDated",
            todo
        });
    } catch(error){
        console.error("Error updating todo:",error);
        res.status(500).json({
            msg:"Internal server errror",
            error: error.message
        })
    }
})


TodoRoute.put("/todoToggle",auth,async function(req,res){
     const userId = req.userId;
     const { isDone,todoId } = req.body;
     console.log(todoId);

    if(!todoId || typeof isDone === "undefined"){
        return res.status(400).json({
            msg:"missing or invalid data"
        })
    }

    try{
        const todo = await todoModel.findOneAndUpdate(
            {_id: todoId,userId}, // filter
            { isDone }, // Update
            { new: true }// Return update doc
        );
        if(!todo){
            return res.status(404).json({
                msg: "Todo not found of unauthorized"})
        }

        res.status(200).json({
            msg: "todo upDated",
            todo
        });
    } catch(error){
        console.error("Error updating todo:",error);
        res.status(500).json({
            msg:"Internal server errror",
            error: error.message
        })
    }
})

TodoRoute.delete("/todo",async function(req,res){
     const todoId = req.body.todoId;
    //  console.log(todoId);

         if (!todoId) {
        return res.status(400).json({ msg: "Missing todoId" });
    }

     const todo = await todoModel.findById(
        todoId)

     if(todo){
        await todoModel.deleteOne({ _id: todoId });
         res.status(200).json({ msg: "Todo deleted" });
     }else {
        res.status(403).send({
            msg:"user not found"
        })
    }
})

module.exports = {
    TodoRoute
}