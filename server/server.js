var browserify = require('browserify-middleware')
var express = require('express')
var Path = require('path')
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
// var mongoose = require('./database/config');
// var Helpers = require('./request_handler');
// var User = require('./database/models/user.js');
// var LocalStrategy = require('passport-local').Strategy;
// var MongoStore = require('connect-mongo')(session);


/********* COMMENTED CODE FROM DIANDRA'S SPRINT - FOR REFERENCE

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  },
  //process of sign up -
  function(req, username, password, done) {
    //node. asnychc
    process.nextTick(function() {
      User.findOne({
        username: username
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, req.flash('signupMessage', 'username takend'));
        } else {
          var newUser = new User();
          newUser.username = username;
          newUser.password = newUser.generateHash(password);

          newUser.save(function(err) {
            if (err) {
              throw err;
            } else {
              return done(null, newUser);
            }
          });
        }
      });
    });
  }));

passport.use('local-login', new LocalStrategy({},
  function(username, password, done) {
    process.nextTick(function() {
      User.findOne({
        'username': username
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.validPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    });
  }

));

function isLoggedIn(req, res, next) {
  console.log('are they authed?????', req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  } else {
  // res.json(404, {user: "Not Found"})
    res.status(404).json({
      user: "Not Found"
    });
  }
}
**************************/

var app = express()
var routes = express.Router()

//redo once we have some public stuffs
routes.get('/app-bundle.js',
  // Tell browserify to use reactify as it's JSX compiler
  browserify('./client/app.js', {
    transform: [require('reactify')]
  }))

/*******************************
//redo once we have some public stuffs
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'browserify'])
})

//Here are all my endpoints! See the README for details
//on what kind of data is expected/being returned
routes.get('/users', isLoggedIn, Helpers.getUsers);
routes.get('/users/*', isLoggedIn, Helpers.getProfile);
routes.get('/messages/*', isLoggedIn, Helpers.getMessages);
// routes.post('/signup', Helpers.signUp);
// routes.post('/signin', Helpers.signIn);
routes.post('/users/*', isLoggedIn, Helpers.submitProfile);
routes.post('/messages', isLoggedIn, Helpers.sendMessage);


routes.post('/signin',
  passport.authenticate('local-login'),
  function(req, res, next) {
    user = req.user;
    if (!user) {
      return res.status(404).json({
        user: "Not Found"
      });
    }
      return res.status(200).json({
        'user' : user,
        authenticated: true
      });
});

routes.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      res.status(404).send();
      return next(err)
    } else {
      return res.status(200).json({
        'user' : user,
        authenticated: true
      });
    }


  })(req, res, next);
});

routes.get('/logout', function(req, res) {
  console.log('logged out', req.body)
  req.session.destroy(function(err) {
    console.log('ok it worked')
  })
  //passport
  // res.redirect('/');
});
**************************/

var assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))

// if (process.env.NODE_ENV !== 'test') {
  app.use(require('body-parser').json())
  app.use(require('body-parser').urlencoded({
    extended: true
  }));

  routes.get('/*', function(req, res) {
    res.sendFile(assetFolder + '/main.html')
  })

  //middleware - executes on any client and server interaction trade
  //marks the request and time on console
  app.use(morgan('dev'));

  app.use(cookieParser());
  //parse our cookie

  // app.use(session({
  //   secret: 'Jang',
  //   saveUninitialized: true,
  //   resave: true,
  //   store: new MongoStore({
  //     mongooseConnection: mongoose.connection,
  //     ttl: 1 * 24 * 60 * 60
  //   })
  // }));
  //saveUninitialized saves session to database for persistent login
  //if set to true - it will save
  // resave -  if nothing is changed - save it again

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());


  app.use('/', routes)


  // Start the server!
  var port = process.env.PORT || 4000
  app.listen(port)
  console.log("Listening on port", port)
// } else {

  module.exports = routes
// }

