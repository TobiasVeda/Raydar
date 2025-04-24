import * as Location from "expo-location";

export interface Coordinates {
    lat: number;
    lon: number;
}

export const getCurrentLocation = async (): Promise<Coordinates | null> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return null;
    }

    const l = await Location.getCurrentPositionAsync({});

    return {
        lat: l.coords.latitude,
        lon: l.coords.longitude,
    };
};
