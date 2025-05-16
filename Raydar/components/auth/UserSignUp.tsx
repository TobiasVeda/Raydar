import { TouchableOpacity, Text, TextInput, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { signUp } from "@/services/auth";

export const UserSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        if (confirmPassword && password !== confirmPassword) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError('');
        }
    }, [password, confirmPassword]);

    const buttonPressed = async () => {
        if (passwordError) return;

        const result = await signUp(email, password);
        if (result) {
            alert("User signed up");
        } else {
            alert("Error, couldn't sign up");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
            />
            {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
            <TouchableOpacity style={styles.submitButton} onPress={buttonPressed}>
                <Text style={styles.submitButtonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        borderColor: '#ddd',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 2,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
});
