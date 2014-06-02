var express = require('express')
  , home  = require('./routes')
  , admin = require('./routes/admin')
  , user  = require('./routes/user')
  , bkmrk = require('./routes/bkmrk')
  , http  = require('http')
  , path  = require('path')
  , mongo = require("mongojs");
//NOTE: we can add username/password to this
//@see http://docs.mongodb.org/manual/reference/connection-string/
var connectionString = 'mongodb:localhost:27017';

var collection_name = 'expressderbycollection';
var mongoDB = mongo(connectionString, [collection_name]);
var myCollection = mongoDB.collection(collection_name);
//data providers
var dataProvider = require('./apps/models/dataprovider');
var userDataProvider = require('./apps/models/userdataprovider');
//models
var bkmrkModel = require('./apps/models/bkmrk/index');
var userModel = require('./apps/models/usermodel');

var app = express();
var exphbs = require('express3-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', home.index);  	//look for index.handlebars
app.get('/admin', admin.admin); //look for admin.handlebars
app.get('/bkmrk', bkmrk.bkmrk); //look for bkmrk.handlebars
//TODO we can add plugin views here
app.get('/users', user.list);

//initialize the models
dataProvider.init(mongoDB,myCollection);
bkmrkModel.init(dataProvider);
userDataProvider.init(mongoDB,myCollection);
userModel.init(userDataProvider);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


/**
 * nifty router, but how to tie it into app?
 */
function onRequestReceived(request, response) {
  console.log('Request in');

  var parsed_url = url.parse(request.url, true);

  console.log(parsed_url);

  switch (parsed_url.pathname) {
    case '/':
      home.index;
      break;
    case '/admin':
      admin/admin;
      break
    case '/users':
      user.list;
      break;
    default:
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end('NodeJS server is working' + "\n");
      break;
  }
}