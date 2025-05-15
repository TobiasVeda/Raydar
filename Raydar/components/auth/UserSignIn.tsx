import { TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { signIn } from '@/services/auth';

export const UserSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const buttonPressed = async () => {
        let result = await signIn(email, password);
        // Replace alert with something more user-friendly
        if (result) {
            alert("User signed in");
        } else {
            alert("Error, couldn't sign in");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TouchableOpacity style={styles.submitButton} onPress={buttonPressed}>
                <Text style={styles.submitButtonText}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styling
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: 'white', // White background for input fields
        borderColor: '#ddd', // Border color
    },
    submitButton: {
        backgroundColor: '#007BFF', // Blue background
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#007BFF', // Border color matching the background
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white', // White text color for the button
    },
});

