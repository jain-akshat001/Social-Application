const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(err){
            console.log('Here is error');
            console.log('error in finding post', err);
            return err;
        }
        
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err){
                    console.log('error in creating comment', err);
                    return err;
                }
                post.comments.push(comment);
                post.save();

                return res.redirect('/');
            });
        }
        else{
            return res.redirect('back');
        }


    });
}