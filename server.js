/**
 * Server: the program's entry point
 */
var express = require('express')
  //routes
  , home  = require('./routes')
  , admin = require('./routes/admin')
  , user  = require('./routes/user')
  , bkmrk = require('./routes/bkmrk')
  //stuff
  , http  = require('http')
  , path  = require('path')
  //database
//  , mongoDB = require('./lib/mongodb')
  , mongoose = require('mongoose')
  //data providers
  , dataProvider = require('./apps/models/dataprovider')
  , userDataProvider = require('./apps/models/userdataprovider')
  //models
  , bkmrkModel = require('./apps/models/bookmarkmodel')
  , userModel = require('./apps/models/usermodel')
  , adminModel = require('./apps/models/adminmodel')
  , tagModel = require('./apps/models/tagmodel');

//NOTE: we can add username/password to this
//@see http://docs.mongodb.org/manual/reference/connection-string/
//Two collections (for now): proxies and users
//var proxyCollection = mongoDB.collection('proxies');
//var userCollection = mongoDB.collection('users');


var connect = require('connect');
var passport = require('passport')
	, Account = require('./apps/models/account')
	, LocalStrategy = require('passport-local');
   // , BasicStrategy = require('passport-http').BasicStrategy;
passport.use(new LocalStrategy(function(username,password,done){
    console.log(username+"//"+password+" is trying to login as local.");
    Account.findOne({'username':username})
        .exec(function(err,puser){
            if(err){log.info(err.stack);}
            if(!puser){
            	console.log("user not found.");
                return done(null, false, { message: 'Unknown user ' + username });
            }
            console.log(puser);
            console.log(puser.username+' '+puser.password);
            Account.comparePassword(password, function(err, isMatch) {
            	console.log('A '+err);
                if (err) return done(err);
                if(isMatch) {
                  return done(null, Account);
                } else {
                  return done(null, false, { message: 'Invalid password' });
                }
              });
            //if (password!==puser.password) {
            //	console.log("password invalid. "+puser.password);
            //    return done(null, false, { message: 'Invalid password' });
            //}
            return done(null, puser);
    });
}));

/////////////
// The Express App
/////////////
var app = express()
	, bodyParser = require('body-parser')
	, cookieParser = require('cookie-parser')
	, flash 	 = require('connect-flash')
	, logger = require('logger').createLogger('development.log');
var exphbs = require('express3-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//app.use(logger); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth) https://github.com/expressjs/cookie-parser
app.use(bodyParser()); // get information from html forms https://github.com/expressjs/body-parser
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
//required for passport
//app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//var routes = require('./routes/routes');
require('./routes/routes.js')(app, passport);
/*app.get('/', home.index);  	//look for index.handlebars
app.get('/admin', admin.admin); //look for admin.handlebars
app.get('/bkmrk', bkmrk.bkmrk); //look for bkmrk.handlebars
//TODO we can add plugin views here
app.get('/users', user.list);
*/

//start mongoose
mongoose.connect('mongodb://127.0.0.1:27017/userdb');

//initialize the models
//dataProvider.init(mongoDB,proxyCollection);
//bkmrkModel.init(dataProvider);
//userDataProvider.init(mongoDB,userCollection);
//userModel.init(userDataProvider);
//adminModel.init(userDataProvider);
//tagModel.init(dataProvider);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

