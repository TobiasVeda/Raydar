import {TextInput} from "react-native";
import {useState} from "react";
import {signUp} from "@/services/auth";

export const UserSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const buttonPressed = async () => {
        let result = await signUp(email, password);
        // Replace alert with something not shit
        if (result){
            alert("User signed up");
        } else{
            alert("Error, couldn't sign up");
        }
    }

    return(
        <div>
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
            <br/>
            <button onClick={buttonPressed} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}>Sign Up</button>
        </div>
    )
}