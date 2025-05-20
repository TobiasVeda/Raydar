import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { requestNotificationPermission, scheduleReapplyReminder } from "@/services/notification";

interface Props {
    uv: number;
}

export const SetReminder: FC<Props> = ({ uv }) => {

    const buttonPressed = async () => {
        await requestNotificationPermission();
        await scheduleReapplyReminder(1); // <-- always 1 minute
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={buttonPressed}>
                <Text style={styles.addTxt}>Remind To Reapply In 2hrs</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginTop: 20,
    },
    addBtn: {
        backgroundColor: '#F5AB3C',
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    addTxt: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
    },
});
