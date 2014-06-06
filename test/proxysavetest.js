/**
 * proxysavetest
 */
////////////////////////////////
// Bring up the infrastructure
////////////////////////////////
var mongoDB = require('../lib/mongodb');
var proxyCollection = mongoDB.collection('proxies');
var userCollection = mongoDB.collection('users');
//data providers
var dataProvider = require('../apps/models/dataprovider');
dataProvider.init(mongoDB,proxyCollection);
////////////////////////////////////////////
// create a proxy
///////////////////////////////////////////


var SubjectProxy = require('../apps/models/subjectproxy');

var proxy = new SubjectProxy();
proxy.setLocator("MyTestProxy");
proxy.setNodeType("FancyNode");
proxy.addSuperClassLocator('MySuper');
console.log('AAA '+proxy.getLocator());

console.log(proxy.toJSON());
//{"locator":"MyTestProxy","instanceOf":"FancyNode","subOf":["MySuper"]}

////////////////////////////////////////////
// save it
// An exercise in asynchronous coding:
//   Both putProxy and getProxy require callbacks in
//   order to sequence them properly
////////////////////////////////////////////
/**
 * Callback from fetching proxy
 * @param err
 * @param data
 */
function fetchCallback(err,data) {
	console.log('FetchCALLBACK '+err+' '+data);
	//FetchCALLBACK null
	
	proxyCollection.find(function(err,data) {
		console.log('ProxyFind '+err+' | '+data);
		//ProxyFind null | [object Object],[object Object]
		if (data) {
			var prx = '2';
			data.forEach(function(sup) {
				
				console.log(sup.locator);
				//undefined
				/**	console.log(sup);
				this is not what one would expect
{ '0': '{',
  '1': '"',
  '2': 'l',
  '3': 'o',
  '4': 'c',
  '5': 'a',
  '6': 't',
  '7': 'o',
  '8': 'r',
  '9': '"',
  '10': ':',
  '11': '"',
  '12': 'M',
  '13': 'y',
  '14': 'T',
  '15': 'e',
  '16': 's',
  '17': 't',
  '18': 'P',
  '19': 'r',
  '20': 'o',
  '21': 'x',
  '22': 'y',
  '23': '"',
  '24': ',',
  '25': '"',
  '26': 'i',
  '27': 'n',
  '28': 's',
  '29': 't',
  '30': 'a',
  '31': 'n',
  '32': 'c',
  '33': 'e',
  '34': 'O',
  '35': 'f',
  '36': '"',
  '37': ':',
  '38': '"',
  '39': 'F',
  '40': 'a',
  '41': 'n',
  '42': 'c',
  '43': 'y',
  '44': 'N',
  '45': 'o',
  '46': 'd',
  '47': 'e',
  '48': '"',
  '49': ',',
  '50': '"',
  '51': 's',
  '52': 'u',
  '53': 'b',
  '54': 'O',
  '55': 'f',
  '56': '"',
  '57': ':',
  '58': '[',
  '59': '"',
  '60': 'M',
  '61': 'y',
  '62': 'S',
  '63': 'u',
  '64': 'p',
  '65': 'e',
  '66': 'r',
  '67': '"',
  '68': ']',
  '69': '}',
  _id: 538d0b52eb2c8395c09b5c42 }
				 */
			});
		}
	});
}

/**
 * Callback from saving proxy
 * @param err
 * @param data
 */
function myCallback(err,data) {
	console.log('MyCALLBACK '+err+' '+data);
	//MyCALLBACK null {"locator":"MyTestProxy","instanceOf":"FancyNode","subOf":["MySuper"]}
	////////////////////////////////////////////
	// fetch it back
	// null credentials == they are not used at this time
	////////////////////////////////////////////
	dataProvider.getProxy(proxy.getLocator(),null, fetchCallback);
	console.log('CCC');
}
dataProvider.putProxy(proxy, myCallback);
console.log('BBB');


