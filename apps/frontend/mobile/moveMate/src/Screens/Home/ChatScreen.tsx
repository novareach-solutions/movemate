import React, {useState, useEffect} from 'react';
import ChatModule from '../../components/ChatModule';
import io from 'socket.io-client';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import apiEndPoints from '../../api/apiEndPoints';

const SOCKET_URL = `${apiEndPoints.baseURL}/order-chat`;

const ChatScreen = () => {
  const route = useRoute();
  const {orderId, senderId, headerTitle} = route.params as {
    orderId: number; // related order id
    senderId: number; //userid
    headerTitle: string; //agent name
  };

  console.log('orderId', orderId);
  console.log('senderId', senderId);
  console.log('headerTitle', headerTitle)

  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      try {
        const response = await axios.get(
          `${apiEndPoints.baseURL}/order-chat/${orderId}/messages`,
        );
        console.log('Response', response);
        setMessages(response.data.reverse());
      } catch (error) {
        console.error('Error fetching previous messages:', error);
      }
    };

    fetchPreviousMessages();
  }, [orderId]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to order-chat socket', newSocket.id);
      newSocket.emit('joinOrderRoom', {orderId});
    });

    newSocket.on('newOrderMessage', (message: any) => {
      console.log('New order message received:', message);
      setMessages(prevMessages => [message, ...prevMessages]);
    });

    newSocket.on('userTyping', (data: any) => {
      console.log('User typing:', data);
    });

    return () => {
      if (newSocket) {
        newSocket.emit('leaveOrderRoom', {orderId});
        newSocket.disconnect();
      }
    };
  }, [orderId]);

  const handleSend = (messageText: string) => {
    if (socket) {
      socket.emit('sendOrderMessage', {
        orderId,
        senderId,
        content: messageText,
      });
    }
  };

  return (
    <ChatModule
      messages={messages}
      onSend={handleSend}
      headerTitle={headerTitle || 'Chat'}
      onReport={() => console.log('Report pressed')}
    />
  );
};

export default ChatScreen;
