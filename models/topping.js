'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topping extends Model {
    static associate(models) {
      topping.belongsTo(models.user, {
        as: 'user',
        foreignKey: {
          name: 'idUser',
        },
      });
      topping.belongsToMany(models.cart, {
        as: 'carts',
        through: {
          model: 'toppingCart',
          as: 'junction',
        },
        foreignKey: 'idTopping',
      });
      topping.belongsToMany(models.order, {
        as: 'orders',
        through: {
          model: 'toppingOrder',
          as: 'junction',
        },
        foreignKey: 'idTopping',
      });
    }
  }
  topping.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'topping',
    }
  );
  return topping;
};
