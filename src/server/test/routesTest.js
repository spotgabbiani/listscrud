let mongoose = require("mongoose");
let List = require('../models/list');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
const sinon  = require('sinon');
const assert = require('assert');
let should = chai.should();

chai.use(chaiHttp);
describe('Lists', () => {

    beforeEach((done) => {
        List.remove({}, (err) => { 
           done();           
        });        
    });

    describe('/GET lists', () => {
        it('it should GET all the lists', (done) => {
        chai.request(server)
            .get('/api/lists')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    describe('/POST list', () => {
        it('it should POST a list with items', (done) => {
            let list = {
                name: "books",
                items: [{name: "The Lord of the Rings"}, {name: "The Name of the Wind"}]
            }
          chai.request(server)
              .post('/api/lists')
              .send(list)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('items');
                done();
              });
        });
    });

    describe('/GET/:id list', () => {
        it('it should GET a list by the given id', (done) => {
            let list = new List({ name: "pizzas", items: [{name: "pepperoni"}, {name: "cheese"}]});
            list.save((err, list) => {
                chai.request(server)
              .get('/api/lists/' + list._id)
              .send(list)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('items');
                    res.body.should.have.property('_id').eql(list.id);
                done();
              });
            });
  
        });
    });

    describe('/PATCH/:id list', () => {
        it('it should PATCH a list and update the name', (done) => {
            const otherList = {name: "flavors"};
            let list = new List({ name: "pizzas", items: [{name: "pepperoni"}, {name: "cheese"}]});
            list.save((err, list) => {
                chai.request(server)
              .patch('/api/lists/' + list._id)
              .send(otherList)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql("flavors");
                    res.body.should.have.property('items');
                    res.body.should.have.property('_id').eql(list.id);
                done();
              });
            });
  
        });
    });

    describe('/DELETE/:id list', () => {
        it('it should DELETE a list', (done) => {
            let list = new List({ name: "pizzas", items: [{name: "pepperoni"}, {name: "cheese"}]});
            list.save((err, list) => {
                chai.request(server)
              .delete('/api/lists/' + list._id)
              .send({id: list._id})
              .end((err, res) => {
                    res.should.have.status(204);
                    res.body.should.be.a('object');
                done();
              });
            });
  
        });
    });

    describe('/GET/:id/items items', () => {
        it('it should GET an array of items', (done) => {
            let list = new List({ name: "pizzas", items: [{name: "pepperoni"}, {name: "cheese"}]});
            list.save((err, list) => {
                chai.request(server)
              .get('/api/lists/' + list._id + '/items')
              .send(list)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                done();
              });
            });
        });
    });

    describe('/GET/:id/items/:id items', () => {
        it('it should GET an item by a given id', (done) => {
            let list = new List({ name: "pizzas", items: [{name: "pepperoni"}, {name: "cheese"}]});
            list.save((err, list) => {
                chai.request(server)
              .get('/api/lists/' + list._id + '/items/'+ list.items[0]._id)
              .send(list)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                done();
              });
            });
        });
    });

    describe('/GET/:id/items/:id items', () => {
        it('it should POST an item to a list', (done) => {
            const newItem = {item: {name: 'veggie'}};
            let list = new List({ name: "pizzas", items: [{name: "pepperoni"}, {name: "cheese"}]});
            list.save((err, list) => {
                chai.request(server)
              .post('/api/lists/' + list._id + '/items/')
              .send(newItem)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('items');
                    res.body.should.have.property('items').be.a('array');
                    res.body.items.length.should.be.eql(3);
                done();
              });
            });
        });
    });

    describe('/GET/:id/items/:id items', () => {
        it('it should PATCH an item from a list', (done) => {
            const newItem = {item: {name: 'veggie'}};
            let list = new List({ name: "pizzas", items: [{name: "pepperoni"}, {name: "cheese"}]});
            list.save((err, list) => {
                chai.request(server)
              .patch('/api/lists/' + list._id + '/items/'+ list.items[0]._id)
              .send(newItem)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.name.should.be.eql('veggie');
                done();
              });
            });
        });
    });

    describe('/GET/:id/items/:id items', () => {
        it('it should DELETE an item from a list', (done) => {
            let list = new List({ name: "pizzas", items: [{name: "pepperoni"}, {name: "cheese"}]});
            list.save((err, list) => {
                chai.request(server)
              .delete('/api/lists/' + list._id + '/items/'+ list.items[0]._id)
              .send({id: list.items[0]._id})
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('items');
                    res.body.items.length.should.be.eql(1);
                    res.body.items[0].name.should.be.eql('cheese');
                done();
              });
            });
        });
    });

    /*describe('/MIDDLEWARE ', () => {
        it('it should validate that auth cookie exists', (done) => {
        const spy = sinon.spy(console, 'log');
        chai.request(server)
            .get('/api/lists')
            .set('Cookie', 'auth=something')
            .end(() => {
                    assert(spy.calledWith('auth cookie was found'));
                done();
            });
        console.log.restore();
        });
    });*/
});