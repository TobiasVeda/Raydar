import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {Platform} from "react-native";

export async function requestNotificationPermission() {
    if (!Device.isDevice) {
        alert('Push notifications are only supported on physical devices.');
        return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert('Notification permission not granted.');
        return false;
    }

    console.log('Notification permission granted!');
    return true;
}

export const testMessage = async ()=>{
    // Will send on loop, do not run
    if (Platform.OS != "web") {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "You've got mail! 📬",
                body: 'Here is the notification body',
                data: {data: 'goes here', test: {test1: 'more data'}},
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: 10,
            },
        });
    }
}

export const scheduleMorningUpdate = async (uv:number, spf:number, hour:number)=>{
    if (Platform.OS != "web") {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Today's UV is " + uv,
                body: "We recommend SPF " + spf,
                data: {data: 'data', test: {test1: 'more data'}},
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DAILY,
                hour: hour,
                minute: 0
            },
        });
    }
}

export const scheduleReapplyReminder = async (minutes:number)=>{
    if (Platform.OS != "web") {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Reapply sunscreen",
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