/**
 * AdminModel
 * <p>Tasks<br />
 * <ul>
 * <li>Account creation</li>
 * <li>User invitation list: emails of users if invitations required</li>
 * <li>...,/li></ul></p>
 */
var ReturnObject = require('./returnobject');

var userDataProvider;

  var AdminModel = module.exports = {
		  init: function(udp) {
			  userDataProvider = udp;
		       	console.log('Initializing AdminModel '+userDataProvider);
		  }
  };
