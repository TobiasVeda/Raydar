import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the settings icon
import { SafeAreaView } from 'react-native-safe-area-context';  // Import SafeAreaView

// Import your custom components
import { UserSignUp } from '@/components/auth/UserSignUp';
import { UserSignIn } from '@/components/auth/UserSignIn';

// URLs for the links
const PRIVACY_POLICY_URL = "https://raydar.no/Home/Privacy";
const TOS_URL = "https://raydar.no/Home/ToS";
const DATA_RESOURCE_URL = "https://raydar.no/Home/DataResource";
const YR_URL = "https://yr.no";

export default function HomeScreen() {
    const [isSignUp, setIsSignUp] = useState(false);

    // Toggle between Sign Up and Log In
    const toggleSignUpLogin = () => {
        setIsSignUp((prev) => !prev);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Settings Gear Icon at the top */}
            <Ionicons name="settings-outline" size={40} color="#007BFF" style={styles.topIcon} />

            <View style={styles.menuContainer}>
                {/* Menu Items */}
                <TouchableOpacity style={styles.menuItem} onPress={() => Linking.openURL(TOS_URL)}>
                    <Text style={styles.menuText}>Terms of Service</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}>
                    <Text style={styles.menuText}>Privacy Policy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => Linking.openURL(DATA_RESOURCE_URL)}>
                    <Text style={styles.menuText}>Learn More</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => Linking.openURL(YR_URL)}>
                    <Text style={styles.menuText}>YR Weather</Text>
                </TouchableOpacity>

                {/* White Container for Sign Up / Log In */}
                <View style={styles.formContainer}>
                    {/* Conditionally Render SignUp or SignIn */}
                    {isSignUp ? (
                        <UserSignUp />
                    ) : (
                        <UserSignIn />
                    )}

                    {/* Toggle between Sign Up and Log In */}
                    <TouchableOpacity onPress={toggleSignUpLogin} style={styles.switchTextContainer}>
                        <Text style={styles.switchText}>
                            {isSignUp ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff8eb',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
    },
    menuContainer: {
        marginTop: 20,
    },
    menuItem: {
        padding: 15,
        backgroundColor: 'white',
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    menuText: {
        fontSize: 18,
        color: 'black',
    },
    switchTextContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    switchText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    topIcon: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    formContainer: {
        padding: 15,
        backgroundColor: 'white', // White background for the login/sign-up form
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
});
