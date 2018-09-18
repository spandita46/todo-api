const express = require('express');
const bodyParser = require('body-parser');

const {
    mongoose
} = require('./db/mongoose');
const {
    Todo
} = require('./models/todo');
const {
    User
} = require('./models/user');


const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then((result) => {
        console.log("Saved New ToDo");
        console.log(JSON.stringify(result, undefined, 2));
        res.send(result);
    }, (err) => {
        console.log("Failed To Save New ToDo", err);
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('ToDo API is listening at port 3000');
})

module.exports = {
    app
};