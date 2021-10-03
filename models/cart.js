'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    static associate(models) {
      cart.belongsTo(models.user, {
        as: 'user',
        foreignKey: {
          name: 'idUser',
        },
      });
      cart.belongsToMany(models.topping, {
        as: 'toppings',
        through: {
          model: 'toppingCart',
          as: 'junction',
        },
        foreignKey: 'idCart',
      });
      cart.belongsTo(models.product, {
        as: 'product',
        foreignKey: {
          name: 'idProduct',
        },
      });
    }
  }
  cart.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idUser: DataTypes.INTEGER,
      idProduct: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      subTotal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'cart',
    }
  );
  return cart;
};
