import React, { useContext, useEffect, useState } from 'react';

import { io } from 'socket.io-client';
import { UserContext } from '../../../context/userContext';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { API } from '../../../config/api';

let socket;

const Chat = () => {
  const { id } = useParams();

  const [state] = useContext(UserContext);
  const [contact, setContact] = useState(null);
  const [messages, setMessages] = useState([]);

  const { data: userDetail } = useQuery('detailUserCache', async () => {
    const response = await API().get('/user/' + id);
    return response.data.userDetail;
  });

  useEffect(() => {
    socket = io('http://localhost:3001', {
      auth: {
        token: localStorage.getItem('token'),
      },
      query: {
        id: state.user.id,
      },
    });

    socket.on('new message', () => {
      socket.emit('load messages', contact?.id);
    });

    socket.on('connect_error', (err) => {
      console.error(err.message);
    });

    loadMessages();

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  // Setup SetContact recipient for connection
  // const onClickContact = (data) => {
  //   setContact(data);
  //   socket.emit('load messages', data.id);
  // };

  // Load Message
  const loadMessages = () => {
    socket.on('messages', (data) => {
      if (messages.length !== data.length) {
        if (data.length > 0) {
          const dataMessages = data.map((item) => ({
            idSender: item.sender.id,
            message: item.message,
          }));
          setMessages(dataMessages);
        }
      }
    });
  };

  // Send Message
  const sendMessage = (e) => {
    if (e.key === 'Enter') {
      const data = {
        idRecipient: userDetail?.id,
        message: e.target.value,
      };
      socket.emit('send message', data);
      e.target.value = '';

      console.log(userDetail?.id);
    }
  };

  return (
    <>
      <div className="custom-status flex-column">
        <div class="mb-3 d-flex flex-column">
          <label for="message" class="form-label fw-bold">
            Message
          </label>
          <input placeholder="Send Message" className="input-message px-4" onKeyPress={sendMessage} />
        </div>
        <h3>Message</h3>
        {messages.map((item, index) => (
          <p>{item.message}</p>
        ))}
      </div>
    </>
  );
};

export default Chat;
