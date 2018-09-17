const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
    if (err) {
        return console.log("Unable To Connect");
    }
    console.log("Connected Successfully To DB");
    const db = client.db('ToDoApp');

    // // delete many
    // db.collection('Todos').deleteMany({
    //         text: 'Something To Do'
    //     })
    //     .then((result) => {
    //         console.log(result);
    //     });

    // // delete one
    // db.collection('Todos').deleteOne({
    //     text: 'First thing To Do'
    // })
    // .then((result) => {
    //     console.log(result);
    // });

     // findOneAndDelete
     db.collection('Todos').findOneAndDelete({
        completed: true
    })
    .then((result) => {
        console.log(result);
    });


    client.close();
});