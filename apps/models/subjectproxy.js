/**
 * SubjectProxy
 * <p>A class which serves the purpose of <em>knowledge representation</em>; each
 * instance is a representation of, a proxy for a <em>subject</em></p>
 */
function SubjectProxy() {
	this.properties = new [];
}
SubjectProxy.prototype.setLocator =function(locator) {
		this.properties['locator']=locator;
};
SubjectProxy.prototype.getLocator = function() {
		return this.properties['locator'];
};
SubjectProxy.prototype.setResourceUrl = function(url) {
	this.properties['url'] = url;
};
SubjectProxy.prototype.getResourceUrl = function() {
	return this.properties['url'];
};
SubjectProxy.prototype.addLabel = function(label, language) {
	var lan = language;
	if (!lan)
		lan = 'en'; // default
	var lx = this.properties['label',lan];
	if (!lx)
		lx = new [];
	lx.push(label);
	this.properties['label',lan] = lx;
};
SubjectProxy.prototype.addDetails = function(details,language) {
	var lan = language;
	if (!lan)
		lan = 'en'; // default
	var lx = this.properties['details',lan];
	if (!lx)
		lx = new [];
	lx.push(details);
	this.properties['details',lan] = lx;
	
};
SubjectProxy.prototype.listLabels = function(language) {
	var lan = language;
	if (!lan)
		lan = 'en'; // default
	return this.properties['label',lan];
};
SubjectProxy.prototype.listDetails = function(language) {
	var lan = language;
	if (!lan)
		lan = 'en'; // default
	return this.properties['details',lan];
};
SubjectProxy.prototype.toJSON = function() {
	//TODO
	return 'test:foo';
};

module.exports = SubjectProxy;