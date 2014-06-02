/**
 * Ticket; a server object for carrying user information around in sessions
 * We do not keep the <code>user</code> around for safety
 * @param User
 */
function Ticket(user) {
	if (!user) {
		this.username = null;
		this.handle= null;
		this.image = null;
		this.avatar = null;
		this.credentials = null;
	} else {
		this.username = user.getUserName();
		this.handle= user.getHandle();
		this.image = user.getImage();
		this.avatar = user.getAvatar();
		this.credentials = user.listCredentials;
	}
}
Ticket.prototype.getUserName = function() {
	return this.username;
};
Ticket.prototype.getHandle = function() {
	return this.handle;
};
Ticket.prototype.getImage = function() {
	return this.image;
};
Ticket.prototype.getAvatar = function() {
	return this.avatar;
};
Ticket.prototype.hasCredential = function(credential) {
	var cx = this.credentials;
	if (!cx)
		return false;
	var has = cx.indexOf(credential);
	return (has > -1);

};
Ticket.prototype.listCredentials = function() {
	return this.credentials;
};



module.exports = Ticket;
