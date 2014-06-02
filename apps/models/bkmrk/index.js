
//exports = module.exports = BookmarkModel 

//function BookmarkModel() {
	//TODO: setup MongoDB persistence
//}

var ReturnObject = require('../returnobject');

var dataProvider;

  var BookmarkModel = module.exports = {
	
	getBookmarklet: function(url) {
		console.log('GETTING: '+url);
		var result = dataProvider.findProxyByURL(url);
		if (result)
			console.log('GOT: '+result.getObject()+' | '+result.hasError()+' | '+result.getErrorString());
		return result;
	},

	postBookmarklet: function(queryString) {
		console.log('POSTING: '+queryString);
	},
	//called from server.js
    init: function(dp) {
        	dataProvider = dp;
        	console.log('Initializing BookmarkletModel '+dataProvider);
	}



  }
  

