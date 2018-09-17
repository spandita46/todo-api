const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
    if (err) {
        return console.log("Unable To Connect");
    }
    console.log("Connected Successfully To DB");
    const db = client.db('ToDoApp');

    db.collection('Todos').insertOne({
        text: 'First thing To Do',
        completed: false,
    }, (err, result) => {
        if (err) {
            return console.log("Unable To Insert");
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    });

    db.collection('Todos').insertOne({
        text: 'Something To Do',
        completed: false,
    }, (err, result) => {
        if (err) {
            return console.log("Unable To Insert");
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    });

    db.collection('Todos').insertOne({
        text: 'Something More To Do',
        completed: true,
    }, (err, result) => {
        if (err) {
            return console.log("Unable To Insert");
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    });

    db.collection('Todos').insertOne({
        text: 'One More thing To Do',
        completed: false,
    }, (err, result) => {
        if (err) {
            return console.log("Unable To Insert");
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    });

    client.close();
});