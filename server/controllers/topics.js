var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

module.exports = {
    show: function (req, res) {
        Topic.find({})
            .populate('posts', 'comments')
            .exec(function (err, topics) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(topics)
                }
            })
    },
    one: function (req, res) {
        console.log('in find one function', req.params.id)
        Topic.findOne({_id: req.params.id})
            .populate('posts', 'comments')
            .exec(function (err, topic) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(topic)
                }
            })
    },

    create: function (req, res) {
        User.findOne({_id: req.body.user._id}, function(err, user){
            console.log('found user', user);
            var topic = new Topic(req.body.topic);
            topic._user = user._id;
            topic.save(function(err){
                user.topics.push(topic);
                user.save(function(err, user){
                    if(err){
                        res.json('Error');
                        console.log('Error saving topic');
                    }else{
                        res.json(user);
                    }
                })
            })
        })
    },
}