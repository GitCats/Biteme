var browserify = require('browserify-middleware')
var express = require('express')
var Path = require('path')
var morgan = require('morgan');
var dealsRouter = require('./controllers/deals.js');
var authRouter = require('./controllers/userauths.js')
var userRouter = require('./controllers/userprefs.js')
var ownerRouter = require('./controllers/owners.js')

var routes = express.Router()

var assetFolder = Path.resolve(__dirname, '../')
routes.use(express.static(assetFolder))

//Get browserify file:
routes.get('/app-bundle.js',
// Tell browserify to use reactify as it's JSX compiler
browserify('./client/app.js', {
  transform: [require('reactify')]
}))

routes.use('/api/getDeals', dealsRouter);
routes.use('/api/login', authRouter);
routes.use('/api/userprefs', userRouter);
routes.use('/api/owner', ownerRouter);

if (process.env.NODE_ENV !== 'test') {

routes.get('/*', function(req, res) {
  res.sendFile(assetFolder + '/client/public/main.html')
})

var app = express()
app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({
  extended: true
}));
  //middleware - executes on any client and server interaction trade
  //marks the request and time on console
app.use(morgan('dev'));

app.use('/', routes)

// Start the server!
var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
}
else{
  //here we're in test mode
  module.exports = routes
}


