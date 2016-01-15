var browserify = require('browserify-middleware')
var express = require('express')
var Path = require('path')
var morgan = require('morgan');
var dealsRouter = require('./controllers/deals.js');

var app = express()
var routes = express.Router()

var assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))

// if (process.env.NODE_ENV !== 'test') {
app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({
  extended: true
}));

  //middleware - executes on any client and server interaction trade
  //marks the request and time on console
app.use(morgan('dev'));

app.use('/api/getDeals', dealsRouter);
app.use('/', routes)

//redo once we have some public stuffs
routes.get('/app-bundle.js',
// Tell browserify to use reactify as it's JSX compiler
browserify('./client/app.js', {
  transform: [require('reactify')]
}))

routes.get('/*', function(req, res) {
  res.sendFile(assetFolder + '/main.html')
})

// Start the server!
var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
// } else {

module.exports = routes
// }

