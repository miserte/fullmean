var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
    one: function (req, res) {
        User.findOne({_id: req.params.id})
            .populate('posts', 'comments')
            .exec(function (err, user) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(user)
                }
            })
    },
    create: function (req, res) {
        var user = new User(req.body);
        user.save(function (err, user) {
            if (err) {
                res.json('Error found when adding user');
            } else {
                res.json(user);
            }
        })
    },
    /*vote: function(req, res){
        User.findOne({ _id: req.body.id }, function (err, quote) {
            if (err) {
                console.log(err);
            } else {
                var new_likes = parseInt(quote.likes) + parseInt(req.body.likes);
                Quote.update({ _id: quote.id }, { likes: new_likes }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('quotes');
                })

            }
        })
    }*/
}