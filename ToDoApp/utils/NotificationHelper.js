// utils/NotificationHelper.js
import notifee from '@notifee/react-native';

// 🔧 Create channel if not exists
const ensureChannel = async () => {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: 4, // high importance
  });
};

// 🟢 Normal Notification
export const showNormalNotification = async (title, body) => {
  await ensureChannel();
  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId: 'default',
      //smallIcon: 'ic_stat_quicktask', // Replace with your icon name if needed
      color: 'blue', // Blue
    },
  });
};

// 🟠 Warning Notification
export const showWarningNotification = async (title, body) => {
  await ensureChannel();
  await notifee.displayNotification({
    title: `⚠️ ${title}`,
    body,
    android: {
     channelId: 'default',
     //smallIcon: 'ic_stat_quicktask',
      color: 'yellow', // Amber/Yellow
    },
  });
};

// 🔴 Error Notification
export const showErrorNotification = async (title, body) => {
  await ensureChannel();
  await notifee.displayNotification({
    title: `❌ ${title}`,
    body,
    android: {
      channelId: 'default',
      //smallIcon: 'ic_stat_quicktask',
      color: 'red', // Red
    },
  });
};


