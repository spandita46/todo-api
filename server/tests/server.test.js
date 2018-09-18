const request = require('supertest');
const expect = require('expect');

const {
    app
} = require('../server');

const {
    Todo
} = require('../models/todo');

const todosList = [{
    text: 'First ToDo'
}, {
    text: 'Second ToDo'
}];

beforeEach((done) => {
    Todo
        .remove({})
        .then(() => {
            Todo.insertMany(todosList);
        })
        .then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const text = "New Job To Do";
        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(todosList.length + 1);
                    expect(todos[todosList.length].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            })
    });

    it('should not create a new todo', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(todosList.length);
                    done();
                }).catch((e) => done(e));
            })
    });
});


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        const text = "New Job To Do";
        request(app)
            .get('/todos')
            .send()
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(todosList.length);
            })
            .end(done)
    });

});