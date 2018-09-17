const {
    MongoClient,
    ObjectId
} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
    if (err) {
        return console.log("Unable To Connect");
    }
    console.log("Connected Successfully To DB");
    const db = client.db('ToDoApp');

    db.collection('Todos')
        .findOneAndUpdate({
            _id: new ObjectId("5b9fece91558eb3504082827")
        }, {
            $set: {
                completed: true,
            }
        }, {
            returnOriginal: false
        })
        .then((result) => {
            console.log(JSON.stringify(result, undefined, 2));

        }, (err) => {
            console.log('Unable To Fetch', err);
        })


    client.close();
});