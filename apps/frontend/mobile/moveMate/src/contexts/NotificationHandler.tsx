import React, { useEffect } from 'react';
import EventSource from 'react-native-event-source';
import Toast from 'react-native-toast-message';
import apiEndpoints from '../api/apiEndPoints';

// Define the expected notification types
enum NotificationTypeEnum {
  CONNECTION = 'CONNECTION',
  ORDER_ACCEPTED = 'ORDER_ACCEPTED',
  ORDER_CANCELLED = 'ORDER_CANCELLED',
  ORDER_COMPLETED = 'ORDER_COMPLETED',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  AGENT_ASSIGNED = 'AGENT_ASSIGNED',
}

const connectToNotifications = (userId: number) => {
  const eventSource = new EventSource(`${apiEndpoints.orderNotification}${userId}`);

  eventSource.onopen = () => {
    console.log('SSE connection established');
  };

  eventSource.onerror = (error) => {
    console.error('SSE connection error:', error);
    eventSource.close();
  };

  return eventSource;
};

const NotificationHandler: React.FC = () => {
  useEffect(() => {
    const userId = getCurrentUserId(); // Implement based on your auth system
    const eventSource = connectToNotifications(userId);

    const showToast = (message: string) => {
      Toast.show({
        type: 'info', // 'success', 'error', etc.
        text1: 'Notification',
        text2: message,
        position: 'top',
        visibilityTime: 4000,
      });
    };

    const handleNotification = (event: MessageEvent) => {
      const notification = JSON.parse(event.data);

      switch (notification.type) {
        case NotificationTypeEnum.CONNECTION:
          showToast(notification.data.message);
          break;
        case NotificationTypeEnum.ORDER_ACCEPTED:
          showToast(`Order #${notification.data.orderId} has been accepted.`);
          break;
        case NotificationTypeEnum.ORDER_CANCELLED:
          showToast(`Order #${notification.data.orderId} was cancelled by ${notification.data.canceledBy}.`);
          break;
        case NotificationTypeEnum.ORDER_COMPLETED:
          showToast(`Order #${notification.data.orderId} has been completed.`);
          break;
        case NotificationTypeEnum.PAYMENT_RECEIVED:
          showToast(`Payment received for Order #${notification.data.orderId}.`);
          break;
        case NotificationTypeEnum.AGENT_ASSIGNED:
          showToast(`Agent assigned for Order #${notification.data.orderId}.`);
          break;
        default:
          showToast('New notification received.');
      }
    };

    // Add event listeners for each notification type
    Object.values(NotificationTypeEnum).forEach((type) => {
      eventSource.addEventListener(type, handleNotification);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  return null; // This component only listens for notifications
};

export default NotificationHandler;
