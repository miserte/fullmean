var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// User schema, related with topics, potsts and comments
var UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true })
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

// Topics schema, related with posts and comments, parent users
var TopicSchema = new mongoose.Schema({
    text: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })
mongoose.model('Topic', TopicSchema);
var Topic = mongoose.model('Topic');

// Post schema, related with comments, parent users topics
var PostSchema = new mongoose.Schema({
    text: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    upvote: { type: Number},
    downvote: { type: Number},
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _topic: { type: Schema.Types.ObjectId, ref: 'Topic' }
}, { timestamps: true })
mongoose.model('Post', PostSchema);
var Post = mongoose.model('Post');

// Comment schema, parent users topics and posts
var CommentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
    _post: { type: Schema.Types.ObjectId, ref: 'Post' }
}, { timestamps: true })
mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');