import React from 'react';
import { signUserOut } from "@/services/auth";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {useData} from "@/contexts/DataProvider";

export const UserSignOut = () => {
    const {getData} = useData();
    const buttonPressed = async () => {
        const result = await signUserOut();
        if (result) {
            alert("User signed out");
            getData(); // get from local storage
        } else {
            alert("Error, couldn't sign out");
        }
    };

    return (
        <TouchableOpacity style={styles.signOutButton} onPress={buttonPressed}>
            <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    signOutButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signOutText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
});
