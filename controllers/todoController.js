const mongoose = require('mongoose');

const DB = process.env.DATABASE;
mongoose.connect(DB,  { useNewUrlParser: true, useUnifiedTopology: true});

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app){
    app.get('/todo', function(req, res){
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render("todo", {todos: data});
        });
    });

    app.post('/todo', function(req, res){
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
}
