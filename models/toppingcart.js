'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class toppingCart extends Model {
    static associate(models) {}
  }
  toppingCart.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idCart: DataTypes.INTEGER,
      idTopping: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'toppingCart',
    }
  );
  return toppingCart;
};
