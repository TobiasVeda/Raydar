import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import { UserSignUp } from '@/components/auth/UserSignUp';
import { UserSignIn } from '@/components/auth/UserSignIn';
import { UserSignOut } from '@/components/auth/UserSignOut';
import { UserDelete } from '@/components/auth/UserDelete';
import {
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
} from 'react-native';
const PRIVACY_POLICY_URL = "https://raydar.no/Home/Privacy";
const TOS_URL = "https://raydar.no/Home/ToS";
const DATA_RESOURCE_URL = "https://raydar.no/Home/Theory";
const YR_URL = "https://yr.no";

export default function HomeScreen() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const toggleSignUpLogin = () => {
        setIsSignUp(prev => !prev);
    };

    return (
        <ScrollView style={styles.container}>
            <Ionicons name="settings-outline" size={40} color="#007BFF" style={styles.topIcon} />

            <View style={styles.menuContainer}>
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

                <View style={styles.formContainer}>
                    {currentUser ? (
                        <>
                            <Text style={styles.emailText}>{currentUser.email}</Text>

                            {showDeleteConfirmation ? (
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        style={styles.goBackButton}
                                        onPress={() => setShowDeleteConfirmation(false)}
                                    >
                                        <Text style={styles.goBackText}>Go Back</Text>
                                    </TouchableOpacity>
                                    <UserDelete onDeleted={() => {
                                        setShowDeleteConfirmation(false);
                                    }} />
                                </View>
                            ) : (
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => setShowDeleteConfirmation(true)}
                                    >
                                        <Text style={styles.deleteButtonText}>Delete User</Text>
                                    </TouchableOpacity>
                                    <UserSignOut />
                                </View>
                            )}
                        </>
                    ) : (
                        <>
                            {isSignUp ? <UserSignUp /> : <UserSignIn />}
                            <TouchableOpacity onPress={toggleSignUpLogin} style={styles.switchTextContainer}>
                                <Text style={styles.switchText}>
                                    {isSignUp ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff8eb',
        padding: 20,
    },
    topIcon: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
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
    formContainer: {
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
    emailText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    switchTextContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    switchText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    deleteButton: {
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
    deleteButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
    goBackButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    goBackText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
});
