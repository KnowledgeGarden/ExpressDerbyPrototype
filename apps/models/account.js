/**
 * User data provider for mongoose
 * Idea from:
 * http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local
 * http://mherman.org/blog/2013/11/11/user-authentication-with-passport-dot-js/#.U5DYYCiiUQo
 */
var mongoose = require('mongoose')
//	, bcrypt   = require('bcrypt-nodejs')
	, Schema = mongoose.Schema
    , passportLocalMongoose = require('passport-local-mongoose');
;

//define the schema for our user model
var Account = new Schema({

    local            : {
        username     : String, //actually email
        password     : String,
        fullname	 : String,
        handle  	 : String,
        avatar		 : String,
        homepage	 : String,
        credentials  : Array
    }
/*,
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
*/
});

Account.plugin(passportLocalMongoose);


// create the model for users and expose it to our app
module.exports = mongoose.model('User', Account);
