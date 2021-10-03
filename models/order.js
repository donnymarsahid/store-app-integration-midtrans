'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    static associate(models) {
      order.belongsToMany(models.topping, {
        as: 'toppings',
        through: {
          model: 'toppingOrder',
          as: 'junction',
        },
        foreignKey: 'idOrder',
      });
      order.belongsTo(models.transaction, {
        as: 'transaction',
        foreignKey: {
          name: 'idTransaction',
        },
      });
      order.belongsTo(models.product, {
        as: 'product',
        foreignKey: {
          name: 'idProduct',
        },
      });
    }
  }
  order.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idProduct: DataTypes.INTEGER,
      idTransaction: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      subTotal: DataTypes.INTEGER,
      cart: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'order',
    }
  );
  return order;
};
