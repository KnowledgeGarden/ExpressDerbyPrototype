/**
 * TagModel
 * <p>Tasks<br />
 * <ul>
 * <li>Create <em>SubjectProxy</em> objects for new tags</li>
 * <li>Fetch tags based on the tag string</li>
 * <li>...,/li></ul></p>
 */

var dataProvider;

  var TagModel = module.exports = {
	init: function(dp) {
			  dataProvider = dp;
		       	console.log('Initializing TagModel '+dataProvider);
	},
	
	/**
	 * 
	 * @param tagString
	 * @param credentials : Ticket
	 * @param callback: signature (err,data)
	 */
	findOrCreateTag: function(tagString, credentials, callback) {
		var result = getTagByTagString(tagString,credentials);
		if (!result.getObject()) {
			var lox = tagStringToLocator(tagString);
			var proxy = new SubjectProxy();
			proxy.setLocator(lox);
			//TODO create a tag proxy
		}
		return result;
	},
	
	/**
	 * 
	 * @param tagSting
	 * @param credentials: Ticket
	 * @param callback: signature (err,data)
	 */
	getTagByTagString: function(tagSting, credentials, callback) {
		var lox = tagStringToLocator(tagString);
		//TODO change to callbacks
		var result = dataProvider.getProxy(lox,credentials);
	}
  	
  };

  /**
   * Convert a tag string, e.g. 'Climate Change' into a
   * topic locator, e.g. 'Climate_Change_TagLocator'
   * @param tagString
   * @return
   */
  function tagStringToLocator(tagString) {
	var result = tagString.replaceAll(' ','_');
	result +='_TagLocator';
	return result;
  }