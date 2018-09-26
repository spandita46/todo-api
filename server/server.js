const _ = require('lodash');
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

app.delete('/todos/:id', (req, res) => {
    const {
        id
    } = req.params;

    if (!ObjectID.isValid(id)) {
        res
            .status(404)
            .send("Invalid Id");
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            res
                .status(404)
                .send("Not A Valid ToDo");
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

app.patch('/todos/:id', (req, res) => {
    const {
        id
    } = req.params;

    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        res
            .status(404)
            .send("Invalid Id");
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            res
                .status(404)
                .send("Not A Valid ToDo");
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