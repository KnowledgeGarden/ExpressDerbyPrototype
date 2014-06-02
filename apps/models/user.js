/**
 * User
 * A class for representing Authenticated Users
 */
function User() {
	this.username = null;
	this.handle= null;
	this.image = null;
	this.avatar = null;
	this.password = null;
	this.credentials = null;
}

User.prototype.setUserNameAndPassword = function(username,password) {
	this.username = username;
	this.password = password;
};
User.prototype.getUserName = function() {
	return this.username;
};
User.prototype.getPassword = function() {
	return password;
};
User.prototype.setHandle = function(handle) {
	this.handle = handle;
};
User.prototype.getHandle = function() {
	return this.handle;
};
User.prototype.setImage = function(image) {
	this.image = image;
};
User.prototype.getImage = function() {
	return this.image;
};
User.prototype.setAvatar = function(avatar) {
	this.avatar = avatar;
};
User.prototype.getAvatar = function() {
	return this.avatar;
};
User.prototype.addCredential = function(credential) {
	var cx = this.credentials;
	if (!cx)
		cx = new [];
	var has = cx.indexOf(credential);
	if (has === -1)
		cx.push(credential);
};
User.prototype.hasCredential = function(credential) {
	var cx = this.credentials;
	if (!cx)
		return false;
	var has = cx.indexOf(credential);
	return (has > -1);

};
User.prototype.removeCredential = function(credential) {
	var cx = this.credentials;
	if (cx) {
		var where = cx.indexOf(credential);
		if (where > -1)
			cx.splice(where,1);
	}

};
User.prototype.listCredentials = function() {
	return this.credentials;
};
User.prototype.toJSON = function() {
	//TODO
	return 'test:foo';
};
module.exports = User;