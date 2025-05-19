import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {deleteCurrentUser} from "@/services/auth";
import {useData} from "@/contexts/DataProvider";



export const UserDelete = ({ onDeleted }: { onDeleted?: () => void }) => {
    const {getData} = useData();

    const buttonPressed = async () => {

        if (await deleteCurrentUser()){
            getData();
            if (onDeleted) onDeleted();
        }

    };

    return (
        <TouchableOpacity style={styles.confirmButton} onPress={buttonPressed}>
            <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    confirmButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#dc3545',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    confirmText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
});
