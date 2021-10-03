const { chat, user } = require('../../models');
const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');

const connectedUser = {};
const socketIo = (io) => {
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      next();
    } else {
      next(new Error('Not Authorized'));
    }
  });

  io.on('connection', async (socket) => {
    console.log('client connected: ', socket.id);

    const userId = socket.handshake.query.id;

    connectedUser[userId] = socket.id;

    // Load Admin Message
    socket.on('load admin contact', async () => {
      try {
        const adminContact = await user.findOne({
          where: {
            status: 'admin',
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        });

        socket.emit('admin contact', adminContact);
      } catch (err) {
        console.log(err);
      }
    });

    // Load Message
    socket.on('load messages', async (payload) => {
      try {
        const token = socket.handshake.auth.token;
        const tokenKey = process.env.JWT_SECRET;
        const verified = jwt.verify(token, tokenKey);
        const idRecipient = payload;
        const idSender = verified.id;
        const data = await chat.findAll({
          where: {
            idSender: {
              [Op.or]: [idRecipient, idSender],
            },
            idRecipient: {
              [Op.or]: [idRecipient, idSender],
            },
          },
          include: [
            {
              model: user,
              as: 'recipient',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
            },
            {
              model: user,
              as: 'sender',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
            },
          ],
          order: [['createdAt', 'DESC']],
          attributes: {
            exclude: ['updatedAt', 'idRecipient', 'idSender'],
          },
        });

        socket.emit('messages', data);
      } catch (error) {
        console.log(error);
      }
    });

    // Send Message
    socket.on('send message', async (payload) => {
      try {
        const token = socket.handshake.auth.token;
        const tokenKey = process.env.JWT_SECRET;
        const verified = jwt.verify(token, tokenKey);
        const idSender = verified.id;
        const { message, idRecipient } = payload;

        console.log(verified.id);

        await chat.create({
          message,
          idRecipient,
          idSender,
        });

        io.to(socket.id).to(connectedUser[idRecipient]).emit('new message', idRecipient);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('disconnect', () => {
      console.log('client disconnected', socket.id);
      delete connectedUser[userId];
    });
  });
};

module.exports = socketIo;
