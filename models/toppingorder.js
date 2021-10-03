'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class toppingOrder extends Model {
    static associate(models) {}
  }
  toppingOrder.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idOrder: DataTypes.INTEGER,
      idTopping: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'toppingOrder',
    }
  );
  return toppingOrder;
};
