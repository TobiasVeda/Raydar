import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {getUserdata, setUserdata, UserDocument} from "@/services/db/db";
import {GeoPoint} from "firebase/firestore";
import {getNameFromCoordinate} from "@/services/geocode";
import {signIn} from "@/services/auth";

const DataContext = createContext<any>(null);


export const useData = () => useContext(DataContext);


export const DataProvider = ({ children }:any) => {
    const [username, setUsername] = useState("");
    const [currentLocation, setCurrentLocation] = useState<GeoPoint>(new GeoPoint(0, 0));
    const [favouriteLocations, setFavouriteLocations] = useState<GeoPoint[]>([]);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);


    const getData = async ()=>{
        let document = await getUserdata();
        if (!document){
            return;
        }
        setUsername(document.username);
        setCurrentLocation(document.currentLocation);
        setFavouriteLocations(document.favouriteLocations);
        setNotificationsEnabled(document.notificationsEnabled);
    }
    const pushData = async ()=>{
        return await setUserdata({
            username: username,
            currentLocation: currentLocation,
            favouriteLocations: favouriteLocations,
            notificationsEnabled: notificationsEnabled
        })
    }

    const getFavouriteState = async (lat:number, lon:number)=>{

        let search = await getNameFromCoordinate(lat, lon);

        for (let i = 0; i < favouriteLocations.length; i++) {
            let compare = await getNameFromCoordinate(favouriteLocations[i].latitude, favouriteLocations[i].longitude);

            if (compare == search){
                return true;
            }
        }
        return false;
    }

    const addAsFavourite = async (lat:number, lon:number)=>{
        let temp = JSON.parse(JSON.stringify(favouriteLocations));
        temp.push(new GeoPoint(lat, lon));
        setFavouriteLocations(temp);
        return true;
    }

    const removeAsFavourite = async (lat:number, lon:number)=>{
        let temp = JSON.parse(JSON.stringify(favouriteLocations));
        let search = await getNameFromCoordinate(lat, lon);

        for (let i = 0; i < temp.length; i++) {
            let compare = await getNameFromCoordinate(temp[i].latitude, temp[i].longitude);

            if (compare == search){
                temp.splice(i, 1);
                setFavouriteLocations(temp);
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        pushData();
    }, [username, currentLocation, favouriteLocations, notificationsEnabled]);


    return (
        <DataContext.Provider
            value={{ username, currentLocation, favouriteLocations, notificationsEnabled, getData, pushData, addAsFavourite, getFavouriteState, removeAsFavourite}}
        >
            {children}
        </DataContext.Provider>
    );
};