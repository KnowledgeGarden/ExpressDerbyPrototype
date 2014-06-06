
/**
 * BookmarkModel
 */

//var ReturnObject = require('./returnobject');

var dataProvider;

  var BookmarkModel = module.exports = {
	
	  /**
	   * Fetch a <em>SubjectProxy</em> for the topic which
	   * represents a website at the given <code>url</code>
	   * @param url
	   * @param title
	   * @param callback: signature (err,data)
	   */
	getBookmarklet: function(url, title, callback) {
		console.log('GETTING: '+url+' '+callback);
		if (!url) 
			callback('BookmarkModel.getBookmarklet missing URL', null);
		else {
			dataProvider.findProxyByURL(url, function(err,data) {
				console.log('BookmarkModel.getBookmarklet: '+err+' | '+data);
				callback(err,data);
			});
		}
	},

	/**
	 * <p>When a bookmarklet <em>form</em> is filled out by a user and
	 * <em>saved</em>, the form's data <code>queryString</code> is
	 * sent here.</p>
	 * @param queryString
	 * @param callback: signature (err,data)
	 */
	postBookmarklet: function(queryString, callback) {
		console.log('POSTING: '+queryString);
	},
	//called from server.js
    init: function(dp) {
        	dataProvider = dp;
        	console.log('Initializing BookmarkletModel '+dataProvider);
	}



  };
  

