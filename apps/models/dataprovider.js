/**
 * DataProvider
 * The primary database API for all topics 
 */
var mongoDB,
	proxyCollection;
//var ReturnObject = require('./returnobject');
var SubjectProxy = require('./subjectproxy');

var DataProvider = module.exports = {
		//called from server.js
	    init: function(mongo, collection) {
	        	mongoDB = mongo;
	        	proxyCollection = collection;
	        	console.log('Initializing DataProvider '+mongoDB+' '+proxyCollection);
		},
		/**
		 * Fetch a proxy identified by 'locator'=<code>lox</code>
		 * @param lox
		 * @param credentials: Ticket
		 * @param callback: signature (err,data)
		 */
		getProxy: function(lox, credentials, callback) {
			console.log('DataProvider.getProxy- '+lox);
			proxyCollection.find({locator:lox}, function(err,doc) {
				console.log('DataProvider.getProxy-1 '+doc+' | '+err);
				//TODO deal with credentials
				callback(err,doc);
			});
		},
		/**
		 * Save a proxy; Note: changes to a proxy require updateProxy
		 * @param proxy
		 * @param callback: signature (err,data)
		 */
		putProxy: function(proxy, callback) {
			proxyCollection.insert(proxy.toJSON(), function(err, saved) {
				console.log('DataProvider.putProxy '+err+' | '+saved);
				callback(err,saved);
			});
			//return result;
		},
		/**
		 * Update a proxy
		 * @param lox
		 * @param credentials: Ticket
		 * @param updateString: JSON string or key/value pairs to update
		 * @param callback: signature (err,data)
		 * @returns
		 */
		updateProxy: function(lox, credentials, updateString, callback) {
			proxyCollection.update(lox, updateString, function(err, result) {
				console.log('DataProvider.updateProxy '+err+' | '+result);
				callback(err,result);
			});
		},
		/**
		 * Find a proxy by the <code>URL</code> it represents
		 * @param url
		 * @param credentials: Ticket
		 * @param callback: signature (err,data)
		 * @returns
		 */
		findProxyByURL: function(url, credentials, callback) {
			if (!url)
				callback('DataProvider.findProxyByURL missing URL', null);
			else {
				proxyCollection.find({url:url}, function(err,doc) {

				console.log('DataProvider.findProxyByURL '+err+' | '+doc);
				//TODO deal with credentials
				callback(err,doc);
				});
			}
		}
		
}