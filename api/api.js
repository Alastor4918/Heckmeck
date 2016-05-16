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
import { defaultState }  from './defaultGame'
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
      where: {
        username: username
      }
    }).then((data) => {
      if (data) {
        res.json({
          response: 'error',
          msg: 'User already exits'
        });
      } else {
        const user = User.create({
          nickname: nickname,
          username: username,
          password: password,
        });
        user.then((data) => {
          req.logIn(user, (loginErr) => {
          res.json({
            result: {
              nickname: data.nickname,
              username: data.username
            },
            error: loginErr
          });
        });
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

  // GAME GREEDY BOT
  function botPlay(user) {
    rollDices(user, true);
    setTimeout(() => {
      if(canPickSomeDice(user)){
        if(userGame[user].dices.alreadyTakenValues.includes(6) || !userGame[user].dices.values.includes(6)){
          let possibleVal={};
          for(let x=0; x < userGame[user].dices.values.length;x++){
            let val= userGame[user].dices.values[x];
            if(!userGame[user].dices.alreadyTakenValues.includes(val)){
              if(possibleVal[val]){
                possibleVal[val]+=1;
              }
              else {
                possibleVal[val]=1;
              }
            }
          }
          let maxVal=0;
          let maxDice=0;
          Object.keys(possibleVal).forEach(
            (key) => {
              if(+key*possibleVal[key] > maxVal){
                maxVal=+key*possibleVal[key];
                maxDice=+key;
              }
              else if(+key*possibleVal[key] === maxVal){
                if(possibleVal[key] < possibleVal[maxDice]){
                  maxDice=+key;
                }
              }
            }
          );
          pickDice({user: user, value: maxDice}, true);
        }
        else {
          pickDice({user: user, value: 6}, true);
        }
        setTimeout(() => checkStonePick(user), 1000);
      }
      else {
          endTurn(user, true);
      }
    }, 1500);
  }

  function checkStonePick(user) {
    if(pickPlayerStone({user: user, id: userGame[user].playerTurn}, true)){
      isEnd(user);
    }
    else {
      let maxVal = 0;
      for (let x = 21; x < 37; x++) {
        if (isStoneAvailable({user: user, value: x})) {
          maxVal = x;
        }
      }

      if (maxVal !== 0) {
        pickStone({user: user, value: maxVal}, true);
      }
      else {
        botPlay(user);
      }
    }
  }

  function canPickSomeDice(user) {
    let result = false;
    const values = userGame[user].dices.values;
    for(let x=0;x < values.length;x++){
      if(!userGame[user].dices.alreadyTakenValues.includes(values[x])){
        result=true;
      }
    }

    return result;
  }

  // END GAME GREEDY BOT

  // GAME FUNCTIONS
  const userSocket = {};
  const userGame = {};


  function endTurn(user, isBot = false){
    const game = userGame[user];
    if((game.playerList[game.playerTurn].name === user || isBot) && !game.endGame) {
      if (game.playerList[game.playerTurn].stones.length) {
        let stone = game.playerList[game.playerTurn].stones.pop();
        game.grill[stone].taken = false;
        if (+stone !== 36) {
          for (let index = 36; index >= 21; index--) {
            if (!game.grill[index].taken && game.grill[index].active) {
              game.grill[index].active = false;
              break;
            }
          }
        }

        let score = 0;
        if (stone <= 24)
          score = 1;
        else if (stone <= 28)
          score = 2;
        else if (stone <= 32)
          score = 3;
        else
          score = 4;

        game.playerList[game.playerTurn].score -= score;
      }

      game.dices = {
          remaining: 8,
          rolled: false,
          score: 0,
          alreadyTakenValues: [],
          values: [0, 0, 0, 0, 0, 0, 0, 0]
        };
      game.playerTurn= (game.playerTurn+1) % game.numberOfPlayers;
      userGame[user] = game;
      isEnd(user);
    }
  }

  function isEnd(user) {
    let end = true;
    const game = userGame[user];
    Object.keys(game.grill).forEach((key) =>
      { end= end && (!game.grill[key].active || game.grill[key].taken); }
    );
    userGame[user].endGame= end;
    userSocket[user].emit('update state', userGame[user]);
    if(userGame[user].playerList[userGame[user].playerTurn].isBot){
      botPlay(user, userGame[user].playerTurn);
    }
  }

  function rollDices(user, isBot = false){
    const game = userGame[user];
    if((game.playerList[game.playerTurn].name === user || isBot) && !game.dices.rolled){
      let values=[];
      for(let i=0;i<game.dices.remaining;i++){
        values.push(Math.floor(Math.random() * 6) + 1);
      }
      userGame[user].dices.values=values;
      userGame[user].dices.rolled=true;
      userSocket[user].emit('update state', userGame[user])
    }
  }

  function pickDice(data, isBot = false) {
    const {user, value} = data;
    const game = userGame[user];
    if((game.playerList[game.playerTurn].name === user || isBot) && game.dices.rolled && !game.dices.alreadyTakenValues.includes(value)){
      let numberOfDices=0;
      for(let x=0;x < game.dices.values.length;x++) {
        if(game.dices.values[x] === value){
          numberOfDices+=1;
        }
      }
      const remaining = game.dices.remaining - numberOfDices;
      let sum;
      if(value === 6 )
        sum = numberOfDices*5;
      else
        sum = numberOfDices*value;

      let newScore = game.dices.score;
      newScore += sum;

      let newDices =[];
      for(let i=0;i<remaining;i++){
        newDices.push(0);
      }

      userGame[user].dices.alreadyTakenValues.push(value);
      userGame[user].dices.values = newDices;
      userGame[user].dices.remaining = remaining;
      userGame[user].dices.rolled = false;
      userGame[user].dices.score = newScore;
      userSocket[user].emit('update state', userGame[user])
    }
  }

  function isStoneAvailable(data) {
    const {user, value} = data;
    const game = userGame[user];
    return (value <= game.dices.score) &&
            game.grill[value].active &&
            !game.grill[value].taken &&
            !game.dices.rolled &&
            game.dices.alreadyTakenValues.includes(6)
  }

  function pickStone(data, isBot = false) {
    const {user, value} = data;
    const game = userGame[user];
    if((game.playerList[game.playerTurn].name === user || isBot) && isStoneAvailable(data)){
      game.grill[value].taken =true;
      game.playerList[game.playerTurn].stones.push(value);
      let cerv=0;
      if(value <=24)
        cerv=1;
      else if(value <=28)
        cerv=2;
      else if(value <=32)
        cerv=3;
      else
        cerv=4;
      game.playerList[game.playerTurn].score += cerv;
      game.dices = {
          remaining: 8,
          rolled: false,
          score: 0,
          alreadyTakenValues: [],
          values: [0,0,0,0,0,0,0,0]
        };
      game.playerTurn= (game.playerTurn+1) % game.numberOfPlayers;
      isEnd(user);
    }
  }

  function isAvailablePlayerStone(data) {
    const {user, id}= data;
    const player = userGame[user].playerList[id];
    return  player.stones.length !==0 &&
            (+player.stones[player.stones.length-1] === userGame[user].dices.score) &&
            !userGame[user].dices.rolled &&
            userGame[user].dices.alreadyTakenValues.includes(6) &&
            userGame[user].playerTurn !== id
  }

  function pickPlayerStone(data, isBot = false) {
    const {user, id} = data;
    const game = userGame[user];
    let pickPlayerStoneId=-1;

    if(isBot) {
      for(let i=0;i<game.playerList.length;i++) {
        if (isAvailablePlayerStone({user: user, id: i})) {
          pickPlayerStoneId = i;
        }
      }
    }
    else if(isAvailablePlayerStone({user: user, id: id})){
      pickPlayerStoneId=id;
    }

    if (pickPlayerStoneId !== -1) {
      const stone = game.playerList[pickPlayerStoneId].stones.pop();
      game.playerList[game.playerTurn].stones.push(stone);
      let cerv=0;
      if(stone <=24)
        cerv=1;
      else if(stone <=28)
        cerv=2;
      else if(stone <=32)
        cerv=3;
      else
        cerv=4;
      game.playerList[game.playerTurn].score += cerv;
      game.playerList[pickPlayerStoneId].score -= cerv;
      game.dices = {
          remaining: 8,
          rolled: false,
          score: 0,
          alreadyTakenValues: [],
          values: [0,0,0,0,0,0,0,0]
        };
      game.playerTurn= (game.playerTurn+1) % game.numberOfPlayers;
      if(isBot){
        return true;
      }
      else {
        isEnd(user);
      }
    }
    if(isBot)
      return false;
  }

  // END GAME FUNCTIONS


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
      //socket.emit('news', {msg: `'Hello World!' from server`});

      socket.on('history', () => {
        for (let index = 0; index < bufferSize; index++) {
          const msgNo = (messageIndex + index) % bufferSize;
          const msg = messageBuffer[msgNo];
          if (msg) {
            socket.emit('msg', msg);
          }
        }
      });

      socket.on('game started',(username) => {
        console.log("ZACINAME ", username);
        userSocket[username]=socket;
        userGame[username]=JSON.parse(JSON.stringify(defaultState));
        userGame[username].playerList[0].name=username;
        socket.emit('update state', userGame[username]);
      });

      socket.on('restart game', (username) => {
        userGame[username]=JSON.parse(JSON.stringify(defaultState));
        userGame[username].playerList[0].name=username;
        userSocket[username].emit('update state', userGame[username]);
      });

      socket.on('end turn', (username) => {
        endTurn(username);
      });


      socket.on('roll dice', (username) => {
        rollDices(username);
      });

      socket.on('pick dice', (data) => {
        pickDice(data);
      });

      socket.on('pick stone', (data) => {
        pickStone(data);
      });

      socket.on('pick player stone', (data) => {
        pickPlayerStone(data);
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

