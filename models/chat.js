'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    static associate(models) {
      chat.belongsTo(models.user, {
        as: 'sender',
        foreignKey: {
          name: 'idSender',
        },
      });
      chat.belongsTo(models.user, {
        as: 'recipient',
        foreignKey: {
          name: 'idRecipient',
        },
      });
    }
  }
  chat.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idSender: DataTypes.INTEGER,
      idRecipient: DataTypes.INTEGER,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'chat',
    }
  );
  return chat;
};
