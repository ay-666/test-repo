const express = require('express');


const bodyParser = require('body-parser');


const app = express();

app.use(express.json()); 


let to_do_list = [{id:101,title:"kok",description:"hhaha"},{id:102,title:"Sleep",description:"Got to sleep"}];

app.get("/todos",function(req,res){
    res.json({to_do_list});
});

app.get("/todos/:id",function(req,res){
    const todo_id = req.params.id;
    for(let i=0;i<to_do_list.length;i++){
        if(to_do_list[i].id == todo_id){
            return res.json(to_do_list[i]);
        }
    }
    res.status(404).send("404 not found");
})

app.post("/todos/",function(req,res){
    const new_todo = {
        id: Date.now(),
        title: req.body.title,
        description:req.body.description
    };
    to_do_list.push(new_todo);
    res.status(201).json(new_todo);
});

app.put("/todos/:id",(req,res)=>{
    const todo_id = req.params.id;
    for(let i=0;i<to_do_list.length;i++){
        if(to_do_list[i].id == todo_id){
            to_do_list[i].title = req.body.title;
            to_do_list[i].description = req.body.description;
            return res.status(200).send("Item was found and updated");

        }
    }
    res.status(404).send("404 not found");
});

app.delete("/todos/:id",(req,res)=>{
    const todo_id = req.params.id;
    let isFound = false;
    let new_todoList = [];
    for(let i=0;i<to_do_list.length;i++){
        if(to_do_list[i].id == todo_id){
            isFound = true;
            continue;
        }
        new_todoList.push(to_do_list[i]);
    }
    if(isFound){
        to_do_list = new_todoList;
        return res.status(200).send("Item was found and deleted");
    }
    res.status(404).send("404 not found");
})

app.all("*",(req,res)=>{
    res.status(404).send();
});


app.listen(3001);
