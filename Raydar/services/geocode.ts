import {geocodeApiKey} from "@/DO_NOT_PUSH";

export interface LocationCoordinate{
    name: string,
    importance: number
    lat: number,
    lon: number
}

export const getNameFromCoordinate = async (lat:number, lon:number)=>{
    let URL1 = "https://api.geoapify.com/v1/geocode/reverse?lat="
    let URL2 = "&lon=";
    let URL3 = "&apiKey="
    let URL = URL1 + lat.toString() + URL2 + lon.toString() + URL3 + geocodeApiKey;

    let response = await fetch(URL);
    let data = (await response.json()).features[0].properties;

    let name = "unknown";

    if (data?.city && data?.country) {
        name = data.city + ", " + data.country;
    } else if(data?.formatted){
        name = data.formatted;
    }

    return name;
}

export const getCoordinatesFromName = async (name:string)=>{
    // Will return a list of possible coordinates matching the name
    // Show the user all options and make them pick one
    // The coordinates of the one the user picks should be added to db
    // All other references to location name made through getNameFromCoordinate()

    let URL1 = "https://api.geoapify.com/v1/geocode/search?text="
    let URL2 = "&apiKey=";
    let URL = URL1 + name + URL2 + geocodeApiKey;

    let response = await fetch(URL);
    let data = (await response.json()).features;

    let trimmedData:LocationCoordinate[] = [];

    for (let i = 0; i < data.length; i++) {
        trimmedData.push({
            name: data[i].properties.formatted,
            importance: data[i].properties.rank.importance,
            lat: parseFloat(data[i].properties.lat),
            lon: parseFloat(data[i].properties.lon)
        });
    }
    return trimmedData;
}