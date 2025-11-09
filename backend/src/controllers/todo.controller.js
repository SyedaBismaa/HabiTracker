const Todo = require ("../models/todo.model")

async function createTodo(req,res) {
    try{
        const{task}=req.body;
        const todo = await Todo.create({
            userId:req.userId,
            task,
             completed: false
        })
        res.status(201).json(todo);
    }catch(err){
        res.status(500).json({message:err.message})
    }
};


async function getTodos(req,res) {
    const todos = await Todo.find({
        userId:req.userId
    })
    res.status(200).json(todos)
};

async function toggleTodo(req,res) {
    const todo = await Todo.findById(req.params.id);
    todo.completed= !todo.completed;
    await todo.save();
    res.status(200).json(todo);
}


async function deleteTodo(req,res) {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message:"Deleted",
    })
}


module.exports={
    createTodo,
    getTodos,
    toggleTodo,
    deleteTodo
}