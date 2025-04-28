import {Button, TextInput, View} from "react-native";
import {useState} from "react";
import {signIn} from "@/services/auth";

export const UserSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const buttonPressed = async () => {
        let result = await signIn(email, password);
        // Replace alert with something not shit
        if (result){
            alert("User signed in");
        } else{
            alert("Error, couldn't sign in");
        }
    }

    return(
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />
            <Button
                title="Sign In"
                onPress={buttonPressed}
            />
        </View>
    )
}