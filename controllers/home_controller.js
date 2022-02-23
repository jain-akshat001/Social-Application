const Post = require('../models/post');

module.exports.home = function(req,res){

    // Post.find({}, function(err,posts){
    //     if(err){
    //         console.log('error in finding the posts : ', err);
    //         return err;
    //     }

    //     return res.render('home', {
    //         title: "HOME",
    //         posts: posts
    //     });
    // });

    // populate the user of each post 
    Post.find({}).populate('user').exec(function(err,posts){
        if(err){
            console.log('error in finding the posts : ', err);
            return err;
        }

        return res.render('home', {
            title: "HOME",
            posts: posts
        });
    });
    
}