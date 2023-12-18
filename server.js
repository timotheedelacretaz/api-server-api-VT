const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json());


const todos = [
    {id:1 , name:'todo1', content:'faire ca'},
    {id:2 , name:'todo2', content:'faire ceci'},
    {id:3 , name:'todo3', content:'faire cela'},
]

app.get('/api',(req,res)=>{
    res.send('hello world');
})
app.get('/api/todos',(req,res)=>{
    res.send(todos);
    if (!todos){
        res.sendStatus(404)
    }
    console.log('get')
    console.log(todos)
})
app.get('/api/todo/:id',(req,res)=>{
    const todo = todos.find(x => x.id === parseInt(req.params.id))
    if (!todo){
        res.sendStatus(404)
    }
    res.send(todo);
    console.log('get')
    console.log(todo)
})
app.post('/api/todo',(req,res)=>{
    if (!req.body){
        res.sendStatus(400)
    }
    const todo = {
        id: Math.max(...todos.map(item => item.id))+1,
        name: req.body.name,
        content: req.body.content
    }
    todos.push(todo)
    res.sendStatus(200)
    console.log('post')
    console.log(todo)
})
app.put('/api/todo/:id',(req,res)=>{
    const todo = todos.find(x => x.id === parseInt(req.params.id))
    if (!todo){
        res.sendStatus(404)
    }
    if (!req.body){
        res.sendStatus(400)
    }
    todo.name = req.body.name;
    todo.content = req.body.content;
    res.sendStatus(200);
    console.log('put')
    console.log(todo)
})
app.delete('/api/todo/:id',(req,res)=>{
    const todo = todos.find(x => x.id === parseInt(req.params.id))
    if (!todo){
        res.sendStatus(404)
    }
    const index = todos.indexOf(todo)
    todos.splice(index,1)
    res.sendStatus(200);
    console.log('delete')
    console.log(todo)
})

const port = process.env.PORT || 3000
app.listen(port,()=>console.log('listening on port 3000'))





