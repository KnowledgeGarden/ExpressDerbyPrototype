/**
 * User
 * A class for representing Authenticated Users
 */
var properties = {
		'username' : '',
		'handle' : '',
		'image' : '',
		'avatar' : '',
		'password' : '',
		'credentials' : []
};
function User() {
}

User.prototype.setUserNameAndPassword = function(username,password) {
	properties.username = username;
	properties.password = password;
};
User.prototype.getUserName = function() {
	return properties.username;
};
User.prototype.getPassword = function() {
	return properties.password;
};
User.prototype.setHandle = function(handle) {
	properties.handle = handle;
};
User.prototype.getHandle = function() {
	return properties.handle;
};
User.prototype.setImage = function(image) {
	properties.image = image;
};
User.prototype.getImage = function() {
	return properties.image;
};
User.prototype.setAvatar = function(avatar) {
	properties.avatar = avatar;
};
User.prototype.getAvatar = function() {
	return properties.avatar;
};
User.prototype.addCredential = function(credential) {
	var cx = properties.credentials;
	var has = cx.indexOf(credential);
	if (has === -1)
		cx.push(credential);
};
User.prototype.hasCredential = function(credential) {
	var cx = properties.credentials;
	var has = cx.indexOf(credential);
	return (has > -1);

};
User.prototype.removeCredential = function(credential) {
	var cx = properties.credentials;
	if (cx) {
		var where = cx.indexOf(credential);
		if (where > -1)
			cx.splice(where,1);
	}

};
User.prototype.listCredentials = function() {
	return properties.credentials;
};
User.prototype.toJSON = function() {
	return JSON.stringify(properties);
};
module.exports = User;