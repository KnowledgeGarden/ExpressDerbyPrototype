/**
 * elasticsearch db
 * @see https://github.com/phillro/node-elasticsearch-client
 */
var ElasticSearchClient = require('elasticsearchclient');

var serverOptions = {
    host: 'localhost',
    port: 9200 //,
   // pathPrefix:'optional pathPrefix',
    //secure: true||false,
    //TODO Optional basic HTTP Auth
    //auth: {
    //username: process.env.ES_USERNAME,
    //    password: process.env.ES_PASSWORD
  };

var elasticSearchClient = module.exports = new ElasticSearchClient(serverOptions);