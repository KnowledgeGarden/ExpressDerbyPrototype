
/**
 * BookmarkModel
 */

var ReturnObject = require('./returnobject');

var dataProvider;

  var BookmarkModel = module.exports = {
	
	  /**
	   * Fetch a <em>SubjectProxy</em> for the topic which
	   * represents a website at the given <code>url</code>
	   * @param url
	   * @returns
	   */
	getBookmarklet: function(url) {
		console.log('GETTING: '+url);
		var result = dataProvider.findProxyByURL(url);
		if (result)
			console.log('GOT: '+result.getObject()+' | '+result.hasError()+' | '+result.getErrorString());
		return result;
	},

	/**
	 * <p>When a bookmarklet <em>form</em> is filled out by a user and
	 * <em>saved</em>, the form's data <code>queryString</code> is
	 * sent here.</p>
	 * @param queryString
	 */
	postBookmarklet: function(queryString) {
		console.log('POSTING: '+queryString);
	},
	//called from server.js
    init: function(dp) {
        	dataProvider = dp;
        	console.log('Initializing BookmarkletModel '+dataProvider);
	}



  };
  

