import React, { createContext, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import EventSource from 'react-native-event-source';
import apiEndpoints from '../api/apiEndPoints';

interface NotificationPayload {
  type: string;
  data: {
    orderId?: number;
    message?: string;
    agentId?: number;
    canceledBy?: string;
    reason?: string;
  };
}

const SSEContext = createContext(null);

export const SSEProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const userId = 123; // Replace with actual user ID from auth
    const eventSource = new EventSource(`${apiEndpoints.orderNotification}${userId}`);

    eventSource.onopen = () => {
      console.log('✅ SSE connection established');
    };

    eventSource.onerror = (error) => {
      console.error('❌ SSE error:', error);
      eventSource.close();
    };

    const handleNotification = (event: MessageEvent) => {
      const notification: NotificationPayload = JSON.parse(event.data);

      if (notification.type === 'ORDER_ACCEPTED') {
        Alert.alert(
          'Order Confirmed',
          `A rider has been assigned to your order #${notification.data.orderId}`
        );
      }
    };

    // Add listeners for each notification type
    eventSource.addEventListener('ORDER_ACCEPTED', handleNotification);

    return () => {
      eventSource.close();
    };
  }, []);

  return <SSEContext.Provider value={null}>{children}</SSEContext.Provider>;
};

export const useSSE = () => useContext(SSEContext);
