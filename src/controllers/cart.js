const { cart, user, toppingCart, topping, product, order, toppingOrder } = require('../../models');

exports.getCarts = async (req, res) => {
  try {
    const carts = await cart.findAll({
      order: [['updatedAt', 'DESC']],
      where: {
        idUser: req.user.id,
      },
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt'],
          },
        },
        {
          model: product,
          as: 'product',
          attributes: {
            exclude: ['createdAt'],
          },
        },
        {
          model: topping,
          as: 'toppings',
          through: {
            model: toppingCart,
            as: 'junction',
            attributes: [],
          },
          attributes: {
            exclude: ['createdAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt'],
      },
    });

    res.status(200).send({
      status: 'success',
      data: carts,
    });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
    });
    console.log(error);
  }
};

exports.addCart = async (req, res) => {
  try {
    const idUser = req.user.id;
    const idProduct = req.params.id;
    const { quantity, subTotal, idTopping } = req.body;

    const addCart = await cart.create({
      idUser,
      idProduct,
      quantity,
      subTotal,
    });

    const addOrder = await order.create({
      idProduct,
      quantity,
      subTotal,
      cart: addCart.id,
    });

    let insert = idTopping.map((data) => {
      return {
        idCart: addCart.id,
        idTopping: data,
      };
    });

    let insertOrder = idTopping.map((data) => {
      return {
        idOrder: addOrder.id,
        idTopping: data,
      };
    });

    if (insertOrder || insert) {
      await toppingCart.bulkCreate(insert);
      await toppingOrder.bulkCreate(insertOrder);
    }

    res.status(200).send({
      status: 'success',
    });
  } catch (error) {
    res.send(500).send({
      status: 'failed',
    });
    console.log(error);
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const idCart = req.params.id;

    await cart.destroy({
      where: {
        id: idCart,
      },
    });
    await order.destroy({
      where: {
        cart: idCart,
      },
    });

    res.status(200).send({
      status: 'success',
      id: idCart,
    });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
    });
    console.log(error);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await order.findAll({
      include: [
        {
          model: product,
          as: 'product',
          attributes: {
            exclude: ['createdAt'],
          },
        },
        {
          model: topping,
          as: 'toppings',
          through: {
            model: toppingOrder,
            as: 'junction',
            attributes: [],
          },
          attributes: {
            exclude: ['createdAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt'],
      },
    });

    res.status(200).send({
      status: 'success',
      orders,
    });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
    });
    console.log(error);
  }
};
