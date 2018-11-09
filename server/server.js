require('dotenv').config(); //Making environmental variables accessible

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fetch = require('node-fetch');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const db = require('./database/elephantsql.js');
const { PassThrough } = require('stream');

function graphqlMiddlewareWrapper(graphqlMiddleware) {
  return (req, res, next) => {
    const resProxy = new PassThrough();
    resProxy.headers = new Map();
    resProxy.statusCode = 200;
    resProxy.setHeader = (name, value) => {
      resProxy.headers.set(name, value);
    };
    res.graphqlResponse = cb => {
      res.statusCode = resProxy.statusCode;
      resProxy.headers.forEach((value, name) => {
        res.setHeader(name, value);
      });
      resProxy.pipe(res).on('finish', cb);
    };
    graphqlMiddleware(req, resProxy).then(() => next(), next);
  };
}

db.sequelize.sync().then(function() {
  //MAKING SURE DATABASE TABLES & MODELS GET ASSOCIATED BEFORE STARTING UP THE SERVER
  app.use(express.static('./dist'));
  app.use(express.static('./static'));

  app.get('/', (req, res) => {
    res.sendFile('index.html');
  });

  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    })
  );

  app.get('/', (req, res) => {
    res.sendFile('index.html');
  });

  app.post(
    '/auth',
    (req, res, next) => {
      next();
    },
    (req, res) => {
      fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.headers.authorization}`
      ).then(googleRes => {
        res.cookie('authorized', 'yes');
        res.send();
        // if (status === 200) // check db for user
        // if user exists in db, create authenticated session with timeout

        // if not, create new user from id token payload and create new session

        // You can prompt the user for any additional profile information you require when you detect a newly created user in your app.
      });
    }
  );

  app.listen(port, () => {
    console.log('Listening on port: ' + port);
  });
});
