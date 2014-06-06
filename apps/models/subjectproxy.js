/**
 * SubjectProxy
 * <p>A class which serves the purpose of <em>knowledge representation</em>; each
 * instance is a representation of, a proxy for a <em>subject</em></p>
 */
function SubjectProxy() {
	this.properties = {};
}
///////////////////////////////////////////////
// Subject Identity:
//   Based on several components:
//      A LOCATOR which is a unique identifier in the database
//      Location in a taxonomy:
//			Type (instanceOf)
//			SuperClass (subclassOf)
//			Relations  (links to Tuples)
///////////////////////////////////////////////
// A Tuple is a SubjectProxy which forms the equivalent
//  of a TRIPLE:
//		{subject, predicate, object}
///////////////////////////////////////////////
/**
 * A <code>locator</code> is a <em>UUID</em> for this
 * object; it is an identifier.
 * @param locator
 */
SubjectProxy.prototype.setLocator =function(locator) {
		this.properties['locator']=locator;
};
SubjectProxy.prototype.getLocator = function() {
		return this.properties['locator'];
};
////////////////////////////////////////////////
// Taxonomy
//   Transitive Closure is a list of all parents "up the tree"
//     from this topic.  Maintaining that lest allows us to
//     answer an "isA" question without multiple databaes calls
//   TransitiveClosure is modeled as properties['transitiveClosure'] list
////////////////////////////////////////////////
SubjectProxy.prototype.setNodeType = function(typeLocator) {
	this.properties['instanceOf'] = typeLocator;
	//TODO: deal with transitive closure
};
SubjectProxy.prototype.getNodeType = function() {
	return this.properties['instanceOf'];
};
SubjectProxy.prototype.addSuperClassLocator = function(superClassLocator) {
	var sups = this.properties['subOf'];
	if (!sups)
		sups = new Array();
	var where = sups.indexOf(superClassLocator);
	if (where < 0) {
		sups.push(superClassLocator);
		this.properties['subOf'] = sups;
	}
	//TODO: deal with transitive closure
};
SubjectProxy.prototype.listSuperClassLocators = function () {
	return this.properties['subOf'];
};

SubjectProxy.prototype.isA = function(locator) {
	var tclist = this.properties['transitiveClosure'];
	if (!tclist)
		return false;
	var where = tclist.indexOf(locator);
	return (where > -1);
};
/////////////////////////////////////////////////
// Text data
/////////////////////////////////////////////////
SubjectProxy.prototype.addLabel = function(label, language) {
	var lan = language;
	if (!lan)
		lan = 'en'; // default
	var key = makeLanguageLabel(lan);

	var lx = this.properties[key];
	if (!lx)
		lx = new [];
	lx.push(label);
	this.properties[key] = lx;
};
SubjectProxy.prototype.addDetails = function(details,language) {
	var lan = language;
	if (!lan)
		lan = 'en'; // default
	var key = makeLanguageDetails(lan);
	var lx = this.properties[key];
	if (!lx)
		lx = new Array();
	lx.push(details);
	this.properties[key] = lx;
	
};
SubjectProxy.prototype.listLabels = function(language) {
	var lan = language;
	if (!lan)
		lan = 'en'; // default
	return this.properties[makeLanguageLabel(lan)];
};
SubjectProxy.prototype.listDetails = function(language) {
	var lan = language;
	if (!lan)
		lan = 'en'; // default
	return this.properties[makeLanguageDetails(lan)];
};

function makeLanguageLabel(language) {
	if (language === 'en')
		return 'label';
	return 'label'+language;
}
function makeLanguageDetails(language) {
	if (language === 'en')
		return 'details';
	return 'details'+language;
}
/////////////////////////////////////////////////
// Other properties
/////////////////////////////////////////////////
SubjectProxy.prototype.setResourceUrl = function(url) {
	this.properties['url'] = url;
};
SubjectProxy.prototype.getResourceUrl = function() {
	return this.properties['url'];
};

SubjectProxy.prototype.toJSON = function() {
	  return JSON.stringify(properties);
};

module.exports = SubjectProxy;