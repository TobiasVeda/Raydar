import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldShowAlert: true
    }),
});

export const sendPushNotification = async (expoPushToken: string) => {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

export const requestNotificationPermission = async () => {

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (!Device.isDevice) {
        alert('Push notifications are only supported on physical devices.');
        return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert('Notification permission not granted.');
        return null;
    }

    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
        console.log('Project ID not found');
    }
    try {
        const pushTokenString = (
            await Notifications.getExpoPushTokenAsync({projectId,})
        ).data;
        console.log('Notification permission granted!');
        return pushTokenString;

    } catch (e: unknown) {
        console.log(`${e}`);
        return null;
    }
}



export const testMessage = async ()=>{
        await Notifications.cancelAllScheduledNotificationsAsync();
}

export const scheduleReapplyReminder = async (minutes:number)=>{
    if (Platform.OS != "web") {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "penis",
                body: 'Protection from sunscreen is greatly diminished',
                data: {data: 'data', test: {test1: 'more data'}},
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: (minutes*60),
                repeats: false,
            },
        });
    }
}