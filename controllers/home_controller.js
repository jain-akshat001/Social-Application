const Post = require('../models/post');
const User = require('../models/user');

// module.exports.home = function(req,res){

//     // Post.find({}, function(err,posts){
//     //     if(err){
//     //         console.log('error in finding the posts : ', err);
//     //         return err;
//     //     }

//     //     return res.render('home', {
//     //         title: "HOME",
//     //         posts: posts
//     //     });
//     // });

//     // populate the user of each post 
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: ({
//             path: 'user'
//         })
//     })
//     .exec(function(err,posts){
//         if(err){
//             console.log('error in finding the posts : ', err);
//             return err;
//         }

//         User.find({}, function(err, users){
//             return res.render('home', {
//                 title: "HOME",
//                 posts: posts,
//                 all_users: users
//             });
//         });
//     });
    
// }

// functions written using async await

module.exports.home = async function(req,res){
    try{
        let posts = await Post.find({}).populate('user')
                .sort('-createdAt')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user'
                    }
                });
    
        let users = await User.find({});

        return res.render('home', {
            title: 'HOME',
            posts: posts,
            all_users: users
        });
    }
    catch(err){
        console.log('Error:', err);
        return err;
    }
}