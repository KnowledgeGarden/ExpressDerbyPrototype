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
var bkmrkModel = require('./apps/models/bookmarkmodel');
var userModel = require('./apps/models/usermodel');
var adminModel = require('./apps/models/adminmodel');
var tagModel = require('./apps/models/tagmodel');

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
adminModel.init(userDataProvider);
tagModel.init(dataProvider);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

