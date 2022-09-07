const express = require('express')
const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require('passport');
const passportJWT = require("passport-jwt");

const config = require('./config')

const userModel = require('./models/user.model')

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretKey,
  passReqToCallback: true
}

const strategy = new JwtStrategy(jwtOptions, async function(req, jwt_payload, next) {
    let user = await userModel.findById(jwt_payload.id)
    if (user) {
      req.user = user
      next(null, user);
    } else {
      next(null, false);
    }
});
passport.use(strategy);

// Connect mongoDB
mongoose
  .connect(config.mongoURI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

const app = express()

app.use(passport.initialize());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

const fileUpload = require('express-fileupload')
app.use(fileUpload())
// API
const api = require('./routes')

app.use('/api/v1', api)

// Create port
const port = process.env.PORT || config.port
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})