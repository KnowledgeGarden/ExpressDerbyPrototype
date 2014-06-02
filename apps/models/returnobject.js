/**
 * ReturnObject
 */
function ReturnObject () {
	this.errorString = null;
	this.retObject = null;
}

ReturnObject.prototype.hasError= function() {
			if (this.errorString)
				return true;
			else
				return false;
};
ReturnObject.prototype.addErrorString = function(errStr) {
			this.errorString += '|'+errStr;
};
ReturnObject.prototype.getErrorString = function() {
	return this.errorString;
};
ReturnObject.prototype.setObject = function(obj) {
			this.retObject = obj;
};
ReturnObject.prototype.getObject = function() {
			return this.retObject;
};

module.exports = ReturnObject;