/**
 * New node file
 */
var mongoDB,
	myCollection;
var ReturnObject = require('./returnobject');
var SubjectProxy = require('./subjectproxy');

var DataProvider = module.exports = {
		//called from server.js
	    init: function(mongo, collection) {
	        	mongoDB = mongo;
	        	myCollection = collection;
	        	console.log('Initializing DataProvider '+mongoDB);
		},
		getProxy: function(lox, credentials) {
			var result = new ReturnObject();
			myCollection.find({locator:lox}, function(err,doc) {
				if (doc) {
					//TODO check credentials
					result.setObject(doc);
				} else
					result.addErrorString(err.toString());
			});
			return result;
		},
		putProxy: function(proxy) {
			var result = new ReturnObject();
			//TODO error callback
			myCollection.save(proxy.toJSON());
			return result;
		},
		findProxyByURL: function(url) {
			var result = new ReturnObject();
			myCollection.find({url:url}, function(err,doc) {
				if (doc) 
					result.setObject(doc);
				else
					result.addErrorString(err.toString());
			});
			return result;
		}
		
}