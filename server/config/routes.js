var users = require('../controllers/users.js');
var topics = require('../controllers/topics.js');
const path = require('path');

module.exports = function (app) {
    //user routes
    app.get('/user:id', function (req, res) {
        
    })
    app.post('/adduser', function (req, res) {
            console.log('arrived to the server /adduser');
            users.create(req, res);
    })

    //topic routes
    app.get('/topics', function (req, res) {
        topics.show(req,res);
    })
    app.get('/gettopic/:id', function (req, res) {
        console.log('in topic/id route');
        topics.one(req,res);
    })
    app.post('/addtopic', function (req, res) {
        topics.create(req, res);
    })

    //posts routes
    app.post('/addpost', function (req, res) {
        
    })

    //comments routes
    app.post('/addcomment', function (req, res) {
        
    })

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/index.html"))
    });
}