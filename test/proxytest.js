/**
 * proxytest
 */
var  mongoose = require('mongoose')
	, SubjectProxy = require('../apps/models/proxy');

mongoose.connect('mongodb://127.0.0.1:27017/userdb');

var myProxy = new SubjectProxy({locator:'MyTestProxyFromSchema-1',
								instanceOf:'MyClassParent',
								creatorId:'park'});
myProxy.addSuperclassLocator("FirstSuper");
myProxy.addSuperclassLocator("SecondSuper");
console.log(myProxy);
/**
{ locator: 'MyTestProxyFromSchema',
instanceOf: 'MyClassParent',
creatorId: 'park',
_id: 539250b7b5ddea181ee84ed2,
details: [],
label: [],
subOf: [ 'FirstSuper', 'SecondSuper' ] }
*/
myProxy.addLabel('Now is the time for all good men','en');
console.log(myProxy);
/*
{ locator: 'MyTestProxyFromSchema-1',
instanceOf: 'MyClassParent',
creatorId: 'park',
_id: 53925854492f38a803ebd139,
details: [],
label: [ 'Now is the time for all good men' ],
subOf: [ 'FirstSuper', 'SecondSuper' ] }
*/
myProxy.addDetails("je vais bien", 'fr');
console.log(myProxy);
