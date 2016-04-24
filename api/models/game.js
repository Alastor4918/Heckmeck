export default function Game(sequelize, DataTypes) {
  const Game = sequelize.define("Game", {
    state: DataTypes.JSON
  }, {
    classMethods: {
      associate: function(models) {
        Game.hasOne(models.User)
        Game.hasMany(models.User)
      }
    }
  });

  return Game;
}