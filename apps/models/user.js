'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var crypto = require('crypto');

module.exports = User;

/**
 * User: a prototype for representing Authenticated Users
 *
 * var user = new User(properties);
 * user.password = 'foo'
 *
 * user.on('password', function (password) {
 *   user.authenticate('foo')
 * });
 *
 * user.on('authenticated', function (authenticated) {
 *   console.log( authenticated ? 'Success!' : 'Wrong password');
 * });
 *
 * user.on('err', function (err) {
 *   throw err;
 * };
 */
util.inherits(User, EventEmitter);
function User(properties) {
  if (! (this instanceof User)) throw new Error('Use `new` with constructors');
  EventEmitter.call(this);
  this._init(properties);
}

var _properties = {
  'username' : '',
  'handle' : '',
  'image' : '',
  'avatar' : '',
  'email' : '',
  'homepage' : '',
  'credentials' : [],
  '_password' : {
    iterations: 2500,
    keylen: 2500,
    salt: undefined,
    hash: undefined
  },
};

User.prototype._init = function _init(properties) {
  if (! properties) properties = {};
  for (var key in this._properties) {
    if (key in properties) {
      this[key] = properties[key];
    } else {
      this[key] = this._properties[key];
    }
  }
  if (! this._password.salt) this._password.salt = this._salt(512);

  this.__defineGetter__('password', this._getPasswordHash);
  this.__defineSetter__('password', this._setPassword);
};

User.prototype._getPasswordHash = function _getPasswordHash() {
  return this._password;
};

User.prototype._setPassword = function _setPassword(pass) {
  var user = this;
  function onPassword(err, derivedKey) {
    if (err) return user.emit('err', err);
    user._password.hash = derivedKey.toString('base64');
    user.emit('password', user._password);
  }

  crypto.pbkdf2(pass, this._password.salt, this._password.iterations,
                this._password.keylen, onPassword);
};

User.prototype.authenticate = function authenticate(pass) {
  var user = this;
  function onAuth(err, derivedKey) {
    if (err) return user.emit('err', err);
    user.emit('authenticated', user._password.hash === derivedKey.toString('base64'));
  }

  crypto.pbkdf2(pass, this._password.salt, this._password.iterations,
                this._password.keylen, onAuth);
};

User.prototype.toJSON = function() {
	return JSON.stringify(_properties);
}
/**
User.prototype.toJSON = User.prototype.stringify;
User.prototype.stringify = function stringify() {
  var doc = {};
  for (var key in this._properties) {
    doc[key] = this[key];
  }
  return JSON.stringify(doc);
};
*/
User.prototype.hasCredential = function hasCredential(cred) {
  return (this.credentials.indexOf(cred) > -1);
};

User.prototype.awardCredential = function awardCredential(cred) {
  if (! this.hasCredential(cred)) this.credentials.push(cred);
};

User.prototype.revokeCredential = function revokeCredential(cred) {
  if (this.hasCredential(cred))
    this.credentials.splice(this.credentials.indexOf(cred), 1);
};


// prototypes can't have private methods
// convention is to use the _ prefix for functions not intended for public use
User.prototype._salt = function _salt(bytes) {
  // return new Buffer(crypto.randomBytes(bytes)).toString('hex');
  return new Buffer(crypto.randomBytes(bytes)).toString('base64');
};

