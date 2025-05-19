import React, {FC, useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {requestNotificationPermission, scheduleReapplyReminder} from "@/services/notification";


interface Props{
    uv: number,
}

export const SetReminder: FC<Props>  = ({uv}) => {
    const [spf, setSpf] = useState(""); // default 2 hours


    const buttonPressed = async ()=>{

        if (Number(spf) != parseInt(spf)){
            alert("Invalid SPF");
            return;
        }
        let minutes = 1 * uv * parseInt(spf);

        await requestNotificationPermission();
        // await scheduleReapplyReminder(minutes);
    }

    return(
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="SPF applied"
                    placeholderTextColor={"gray"}
                    value={spf}
                    onChangeText={setSpf}
                    keyboardType="numeric"
                    inputMode="numeric"
                    maxLength={3}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={buttonPressed}>
                    <Text style={styles.addTxt}>Remind to Reapply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginTop: 20,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F5AB3C',
        backgroundColor: '#fff',
    },
    input: {
        flex: 0.3,
        paddingVertical: 12,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: 'white',
        borderRightWidth: 1,
        borderRightColor: '#F5AB3C',
    },
    addBtn: {
        flex: 0.7,
        backgroundColor: '#F5AB3C',
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addTxt: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});