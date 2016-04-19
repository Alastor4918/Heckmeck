var Sequelize = require('sequelize');
var sequelize = new Sequelize('heckmack', 'admin', 'admin', {
  //host: 'localhost',
  //port: '3000',
  dialect: 'sqlite',

  //pool: {
  //  max: 5,
  //  min: 0,
  //  idle: 10000
  //},

  // SQLite only
  storage: '/home/alastor/projekty/heckmeck/heckmeck.sqlite'
});

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  nickname: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  freezeTableName: true
});

var Lobby = sequelize.define('lobby',{
  limit: Sequelize.INTEGER,
  name: Sequelize.STRING
},{
  freezeTableName: true
});

var Score = sequelize.define('score',{
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
},{
  freezeTableName: true
});

var Game = sequelize.define('game',{
  state: Sequelize.JSON
},{
  freezeTableName: true
});

User.hasMany(Score, {foreignKey: 'player'});
Game.hasOne(User, {foreignKey: 'owner'});
Lobby.hasOne(User, {foreignKey: 'owner'});
Game.hasMany(User, {foreignKey: 'playerList'});
Lobby.hasMany(User, {foreignKey: 'playerList'});


export function createDB(){
  sequelize.sync();
}


