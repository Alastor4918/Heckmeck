export default function User(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Score)
      }
    }
  });

  return User;
}