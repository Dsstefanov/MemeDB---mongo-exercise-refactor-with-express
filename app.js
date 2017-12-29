let express = require('express')
let path = require('path')
let favicon = require('serve-favicon')
let logger = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')

let index = require('./routes/index')
let users = require('./routes/users')
let generateTag = require('./routes/generateTag')
let addImage = require('./routes/addImage')
let searchHandler = require('./routes/search')
let deleteImage= require('./routes/deleteImage')

let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
//app.use(express.static(path.join(__dirname, 'public')))
app.use("/public", express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)
app.post('/generateTag', generateTag)
app.post('/addImage', addImage)
app.get('/search', searchHandler)
app.get('/delete', deleteImage)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
