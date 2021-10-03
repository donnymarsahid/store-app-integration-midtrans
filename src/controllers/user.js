const { user, transaction } = require('../../models');

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: transaction,
          as: 'transactions',
          attributes: {
            exclude: ['createdAt'],
          },
        },
      ],
      attributes: {
        exclude: ['password', 'createdAt'],
      },
    });

    res.send({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await user.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: 'success',
      data: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = await user.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ['password', 'createdAt'],
      },
    });

    res.send({
      status: 'success',
      data: userId,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const path = process.env.IMG_URL;
    const uploadFile = path + req.file.filename;
    const { fullname, phone, posCode, address } = req.body;
    const idUser = req.user.id;

    const updateUserId = await user.update(
      { fullname, image: uploadFile, phone, posCode, address },
      {
        where: {
          id: idUser,
        },
      }
    );

    res.status(200).send({
      status: 'success',
      id: updateUserId,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getUserDetail = async (req, res) => {
  try {
    const userDetail = await transaction.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['password', 'createdAt'],
          },
        },
      ],
      attributes: {
        exclude: ['password', 'createdAt'],
      },
    });

    res.send({
      status: 'success',
      data: {
        userDetail,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
