const uuid = require('uuid/v4')

module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    'movie',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuid()
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      synopsis: {
        type: DataTypes.STRING
      },
      year: {
        type: DataTypes.INTEGER
      },
      genres: {
        type: DataTypes.STRING
      },
      posterUrl: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: true
    }
  )

  return Movie
}
