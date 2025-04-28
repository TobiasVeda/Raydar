import {signUserOut} from "@/services/auth";
import {Button} from "react-native";

export const UserSignOut = ()=>{

    const buttonPressed = async ()=>{
        let result = await signUserOut();
        // Replace alert with something not shit
        if (result){
            alert("User signed out");
        } else{
            alert("Error, couldn't sign out");
        }
    }

    return(
        <Button
            title="Sign Out"
            onPress={buttonPressed}
        />
    )
}