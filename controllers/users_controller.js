const User = require('../models/user');

module.exports.profile = function(req,res){

    // console.log(req);

    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(err){
                console.log('error in finding the user : ', err);
                return err;
            }

            if(user){
                return res.render('profile',{
                    title: 'PROFILE',
                    user: user
                });
            }

            return res.redirect('/users/sign-in');

        });
    }
    else{
        return res.redirect('/users/sign-in');
    }
    
}

module.exports.signUp = function(req,res){
    res.render('user_sign_up',{
        title: "SIGN UP"
    });
}

module.exports.signIn = function(req,res){
    res.render('user_sign_in', {
        title: "SIGN IN"
    });
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email : req.body.email} , function(err, user){
        if(err){
            console.log(`error in finding the user in signing up : ${err}`);
            return err;
        }

        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log(`error in creating the user in signing up : ${err}`);
                    return err;
                }
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });

}

module.exports.createSession = function(req,res){
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log(`error in finding user in signing up : ${err}`);
            return err;
        }

        if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else{
            return res.redirect('back');
        }
    });
}

module.exports.deleteSession = function(req,res){
    return res.redirect('/users/sign-in');
}