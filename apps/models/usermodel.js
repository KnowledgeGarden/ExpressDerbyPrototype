/**
 * UserModel
 * The primary database API for all User data
 * TODO: modify to use account.js as the User object itself
 */
var userDataProvider;
var userCollection;

var UserModel = module.exports = {
		init:  function(udp) {
			userDataProvider = udp;
			console.log("UserModel init "+userDataProvider);
		},
		authenticate: function(username, password, callback) {
			userDataProvider.authenticate(username,password,function(err,data) {
				var result = data;
				if (data) {
					//in theory, it's a JSON object for the user
					//TODO result = convert that to a ticket
				}
				callback(err,result);
			});
		},
		newUser: function(username,password,handle,avatar,email, callback) {
			//TODO
		},
		/**
		 * 
		 * @param credentials: Ticket
		 * @param callback: (err, data) true || false
		 */
		userIsAdmin: function(credentials, callback) {
			var creds = credentials.hasCredential('Admin');
			callback('',creds);
		},
		/**
		 * 
		 * @param user: User
		 * @param isAdmin: true || false
		 * @param callback: signature (err,data)
		 */
		setUserIsAdmin: function(user, isAdmin, callback) {
			//TODO
		},
		addCredential: function(user, credential, callback) {
			//TODO
		},
		removeCredential: function(user,credential,callback) {
			//TODO
		}
		
//TODO
}