export default function Score(sequelize, DataTypes) {
  const Score = sequelize.define("Score", {
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    value: DataTypes.INTEGER
  });

  return Score;
}