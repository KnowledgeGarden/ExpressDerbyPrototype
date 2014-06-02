/**
 * New node file
 */
var userDataProvider;
var User = require('./user');
var Ticket = require('./ticket');
var UserModel = module.exports = {
		init:  function(udp) {
			userDataProvider = udp;
			console.log("UserModel init "+userDataProvider);
		}
}