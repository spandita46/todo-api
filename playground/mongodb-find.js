const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
    if (err) {
        return console.log("Unable To Connect");
    }
    console.log("Connected Successfully To DB");
    const db = client.db('ToDoApp');

    db.collection('Todos').find({
            completed: true
        }).toArray()
        .then((docs) => {
            console.log('ToDos');
            console.log(JSON.stringify(docs, undefined, 2));

        }, (err) => {
            console.log('Unable To Fetch', err);
        })


    client.close();
});