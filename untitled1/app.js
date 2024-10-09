var createError = require('http-errors');
var express = require('express');
const cors = require('cors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var docsAiRouter = require('./routes/docsAi')
var openAiRouter = require('./routes/openAi')
var errorsHandling= require('./routes/errorsHandling')
var virtualFiscalisation= require('./routes/virtualFiscalisation')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const allowedOrigins = ['http://localhost:4200', 'https://yourfrontenddomain.com', 'https://gcp-certification-pxdyos.web.app', 'https://gcp-certification-415402.web.app'];
app.use(cors({
  origin: function (origin, callback) {
    // Check if the origin is in the allowed list or if it's undefined (no origin, like curl requests, mobile apps, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

process.env.GOOGLE_APPLICATION_CREDENTIALS = "./gcp-certification-415402-2f0d63c56edf.json";
process.env.SMPT_HOST= "smtp.gmail.com"
process.env.SMPT_PORT = 465
// process.env.SMPT_PASSWORD = "pvdamawfrmnemvtk"
// process.env.SMPT_MAIL="lerandyy1@gmail.com"
process.env.SMPT_PASSWORD = "nkgwcquinkwgoqyv"
process.env.SMPT_MAIL="no-reply@axissol.com"
process.env.CC_AXIS_EMAIL = "alleaworldwide@gmail.com"
process.env.ZIMRA_EMAIL1 = "tmuranda1@gmail.com"
process.env.ZIMRA_EMAIL2 = "tmuranda1@gmail.com"
process.env.ZIMRA_EMAIL3 = "tmuranda1@gmail.com"  
process.env.ZIMRA_EMAIL4 = "tmuranda1@gmail.com"
process.env.ZIMRA_EMAIL5 = "tmuranda1@gmail.com"
process.env.NEW_API_KEY = "YzJyX6vqhLo5B7EuGmfyT3BlbkFJAv1y1ND1LwxFxKIJsZxf"
process.env.NEW_ORG = "tmuranda1@qh0kGZpHPETrEaATaHeZNFQo.com"



process.env.API_URL="http://140.82.25.196:10069/api/"

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/docsAi', docsAiRouter)
app.use('/openAi', openAiRouter)
app.use('/errorsHandling', errorsHandling)
app.use('/virtualFiscalisation', virtualFiscalisation)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
