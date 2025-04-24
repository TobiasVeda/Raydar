
export interface LocationCoordinate{
    name: string,
    importance: number
    lat: number,
    lon: number
}
let apiKey = "680a383c75bee709254242fjc181721"

export const getNameFromCoordinate = async (lat:number, lon:number)=>{
    let URL1 = "https://geocode.maps.co/reverse?lat="
    let URL2 = "&lon=";
    let URL3 = "&api_key="
    let URL = URL1 + lat.toString() + URL2 + lon.toString() + URL3 + apiKey;

    let response = await fetch(URL);
    let data = await response.json();

    return data.address.municipality + ", " + data.address.country;
}

export const getCoordinatesFromName = async (name:string)=>{
    // Will return a list of possible coordinates matching the name
    // Show the user all options and make them pick one
    // The coordinates of the one the user picks should be added to db
    // All other references to location name made through getNameFromCoordinate()

    let URL1 = "https://geocode.maps.co/search?q="
    let URL2 = "&api_key=";
    let URL = URL1 + name + URL2 + apiKey;

    let response = await fetch(URL);
    let data = await response.json();

    let trimmedData:LocationCoordinate[] = [];

    for (let i = 0; i < data.length; i++) {
        trimmedData.push({
            name: data[i].display_name,
            importance: data[i].importance,
            lat: parseFloat(data[i].lat),
            lon: parseFloat(data[i].lon)
        });
    }
    return trimmedData;
}