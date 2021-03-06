export default function Lobby(sequelize, DataTypes) {
  const Lobby = sequelize.define("Lobby", {
    limit: DataTypes.INTEGER,
    name: DataTypes.STRING,
    players: DataTypes.JSON
  }, {
    classMethods: {
      associate: function(models) {
        Lobby.hasOne(models.User);
        Lobby.hasMany(models.User);
      }
    }
  });

  return Lobby;
}