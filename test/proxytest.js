/**
 * proxy test
 */

var SubjectProxy = require('../apps/models/subjectproxy');

var proxy = new SubjectProxy();
proxy.setLocator("MyTestProxy");
proxy.setNodeType("FancyNode");
proxy.addSuperClassLocator('MySuper');

console.log(proxy.toJSON());