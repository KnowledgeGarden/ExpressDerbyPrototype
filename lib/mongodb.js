/**
 * mongodb utility: based on mongojs
 */
var  mongo = require("mongojs");

var connectionString = 'mydb'; //'mongodb://localhost:27017';

//NOTE: reliance on the two collections; must pay attention if other collections added
var mongoDB = module.exports = mongo(connectionString, ['proxies','users']);

