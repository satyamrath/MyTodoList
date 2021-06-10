const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

var app = express();
app.use(express.urlencoded({ extended: true}));

const todoController = require('./controllers/todoController');
const homeController = require('./controllers/homeController');

app.set("view engine", 'ejs');

// static files
app.use(express.static('./public')); // check for every route

// fire controllers
todoController(app);
homeController(app);

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});
