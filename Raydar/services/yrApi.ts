
interface UvStrength {
    timestamp:string,
    strength:number;
}


export const getCompleteData = async (lat:number, lon:number) => {
    let URL1 = "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat="
    let URL2 = "&lon=";
    let URL = URL1 + lat.toString() + URL2 + lon.toString();

    let response = await fetch(URL);
    return await response.json();
}


export const getUvForecast = async (lat:number, lon:number) => {
    let data = await getCompleteData(lat, lon);

    let trimmedData:UvStrength[] = [];

    for (let i = 0; i < data.properties.timeseries.length; i++) {
        trimmedData.push({
            timestamp: data.properties.timeseries[i].time,
            strength: data.properties.timeseries[i].data.instant.details.ultraviolet_index_clear_sky
        })
    }

    return trimmedData;
}


export const getForecastAtTime = async (trimmedData:UvStrength[], time:string): Promise<UvStrength | null> => {
    if (trimmedData.length === 0) return null;

    const targetTime = new Date(time).getTime();

    let closest = trimmedData[0];
    let minDiff = Math.abs(new Date(closest.timestamp).getTime() - targetTime);

    for (const item of trimmedData) {
        const itemTime = new Date(item.timestamp).getTime();
        const diff = Math.abs(itemTime - targetTime);

        if (diff < minDiff) {
            closest = item;
            minDiff = diff;
        }
    }
    return closest;
}

