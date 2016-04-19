export default function Score(sequelize, DataTypes) {
  const Score = sequelize.define("Score", {
    username: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  return Score;
}