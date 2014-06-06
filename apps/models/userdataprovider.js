/**
 * UserDataProvider
 */
var mongoDB,
	userCollection;
//var ReturnObject = require('./returnobject');
var User = require('./user');

var UserDataProvider = module.exports = {
		//called from server.js
	    init: function(mongo, collection) {
	        	mongoDB = mongo;
	        	userCollection = collection;
	        	console.log('Initializing UserDataProvider '+mongoDB);
		},
		//////////////////////////////////////////////
		// User data
		// NOTE: <code>username</code> is the primary key for all users
		//////////////////////////////////////////////
		/**
		 * 
		 * @param usrname
		 * @param password
		 * @param callback: signature (err,data)
		 * @returns {ReturnObject}
		 */
		authenticate: function(usrname, password, callback) {
			userCollection.find({$and:[{username:username}, {pwd:password}]}, function(err,doc) {
				console.log('UserDataProvider.authenticate '+username+' '+err+' | '+doc);
				callback(err,doc);
			});

		},
		newUser: function(username, password, /*todo*/ callback) {
			
		},
		removeUser: function(username, callback) {
			
		},
		updateUser: function(username, updateString, callback) {
			
		},
		//////////////////////////////////////////////
		// Invitation list
		//////////////////////////////////////////////
		addInvitation: function(email, callback) {
			
		},
		getInvitation: function(email, callback) {
			
		},
		removeInvitation: function(email,callback) {
			
		},
		isInvited: function(email,callback) {
			
		}
}