import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { login } from './actions/login';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import { sequelize, User } from './models/index'; // TAKTO sa to includuje

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

sequelize.sync().then(() => {
  app.use(session({
    secret: 'alastor je awesome !!!',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }));

  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((user, done) => User.findOne({id: user}).then((result) => done(null, result)).catch((err) => done(err)));

  passport.use(new LocalStrategy((username, password, done) => {
    login(username, password).then((response) => done(response.error, response.result, null));
  }));

  app.post('/login/', (req, res, next) => passport.authenticate('local', (dbErr, user) => {
    if (dbErr) {
      res.json({
        result: null,
        error: dbErr,
      });
    } else {
      req.logIn(user, (loginErr) => {
        res.json({
          result: {
            nickname: user.nickname,
            username: user.username
          },
          error: loginErr
        });
      });
    }
  })(req, res, next));

  app.post('/logout/', (req, res) => {
    req.logout();
    res.json({});
  });

  app.post('/register/', (req, res) => {
    const {nickname, username, password} = req.body;
    User.findOne({
      username: username,
    }).then((data) => {
      if (data) {
        res.json({
          response: 'error',
        });
      } else {
        const user = User.create({
          nickname: nickname,
          username: username,
          password: password,
        });
        user.then(() => {
          res.json({
            response: 'success',
          })
        })
      }
    });
  });

  app.use((req, res) => {
    const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

    const {action, params} = mapUrl(actions, splittedUrlPath);

    if (action) {
      action(req, params)
        .then((result) => {
          if (result instanceof Function) {
            result(res);
          } else {
            res.json(result);
          }
        }, (reason) => {
          if (reason && reason.redirect) {
            res.redirect(reason.redirect);
          } else {
            console.error('API ERROR:', pretty.render(reason));
            res.status(reason.status || 500).json(reason);
          }
        });
    } else {
      res.status(404).end('NOT FOUND');
    }
  });


  const bufferSize = 100;
  const messageBuffer = new Array(bufferSize);
  let messageIndex = 0;

  if (config.apiPort) {
    const runnable = app.listen(config.apiPort, (err) => {
      if (err) {
        console.error(err);
      }
      console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
      console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
    });

    io.on('connection', (socket) => {
      socket.emit('news', {msg: `'Hello World!' from server`});

      socket.on('history', () => {
        for (let index = 0; index < bufferSize; index++) {
          const msgNo = (messageIndex + index) % bufferSize;
          const msg = messageBuffer[msgNo];
          if (msg) {
            socket.emit('msg', msg);
          }
        }
      });

      socket.on('msg', (data) => {
        data.id = messageIndex;
        messageBuffer[messageIndex % bufferSize] = data;
        messageIndex++;
        io.emit('msg', data);
      });
    });
    io.listen(runnable);
  } else {
    console.error('==>     ERROR: No PORT environment variable has been specified');
  }
});

