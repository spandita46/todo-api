const express = require('express');
const bodyParser = require('body-parser');
const {
    ObjectID
} = require('mongodb');

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
        res
            .send(result);
    }, (err) => {
        res
            .status(400)
            .send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res
            .send({
                todos
            });
    }).catch((err) => {
        res
            .status(400)
            .send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    const {
        id
    } = req.params;

    if (!ObjectID.isValid(id)) {
        res
            .status(404)
            .send("Invalid Id");
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            res
                .status(404)
                .send();
        }
        res
            .send({
                todo
            });
    }).catch((err) => {
        res
            .status(400)
            .send(err);
    });
});

app.listen(3000, () => {
    console.log('ToDo API is listening at port 3000');
})

module.exports = {
    app
};