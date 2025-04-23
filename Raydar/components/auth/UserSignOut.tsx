import {signUserOut} from "@/services/auth";

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
        <button onClick={buttonPressed} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}>Sign Out</button>
    )
}