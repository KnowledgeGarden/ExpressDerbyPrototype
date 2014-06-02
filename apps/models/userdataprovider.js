/**
 * UserDataProvider
 */
var mongoDB,
	myCollection;
var ReturnObject = require('./returnobject');
var User = require('./user');

var UserDataProvider = module.exports = {
		//called from server.js
	    init: function(mongo, collection) {
	        	mongoDB = mongo;
	        	myCollection = collection;
	        	console.log('Initializing UserDataProvider '+mongoDB);
		},
		authenticate: function(usrname, password) {
			var result = new ReturnObject();
			myCollection.find({$and:[{username:username}, {pwd:password}]}, function(err,doc) {
				if (doc) 
					result.setObject(doc);
				else
					result.addErrorString(err.toString());
			});
			return result;

		}
}