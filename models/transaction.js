'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    static associate(models) {
      transaction.belongsTo(models.user, {
        as: 'user',
        foreignKey: {
          name: 'idUser',
        },
      });
      transaction.hasMany(models.order, {
        as: 'orders',
        foreignKey: {
          name: 'idTransaction',
        },
      });
    }
  }
  transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idUser: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      total: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      posCode: DataTypes.STRING,
      address: DataTypes.STRING,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'transaction',
    }
  );
  return transaction;
};
