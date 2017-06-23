var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Topic = mongoose.model('Topic');

module.exports = {
    create: function (req, res) {
        Topic.findOne({ _id: req.body.topic._id }, function (err, topic) {
            var post = new Post(req.body.post);
            post._topic = topic._id;
            post.save(function (err) {
                topic.posts.push(post);
                topic.save(function (err, topic) {
                    if (err) {
                        res.json('Error');
                        console.log('Error saving post');
                    } else {
                        res.json(topic);
                    }
                })
            })
        })
    },
    vote: function (req, res) {
        console.log('vote body', req.body);
        Post.findOne({ _id: req.body.id}, function (err, post) {
            if(req.body.vote === 'up'){
                post.upvote = post.upvote + 1
            }
            else if (req.body.vote === 'down'){
                post.downvote = post.downvote +1
            }
            post.save(function (err, post) {
                if (err) {
                    console.log(error);
                }
                else {
                    res.json(post);
                }
            })
        }
        )
    },
}
    /*show: function (req, res) {
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
    },*/