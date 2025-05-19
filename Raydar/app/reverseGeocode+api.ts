import {geocodeApiKey} from "@/DO_NOT_PUSH";

export async function GET(request: Request) {

    const url = new URL(request.url);
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');

    // add apikey when building
    let URL1 = "https://api.geoapify.com/v1/geocode/reverse?lat=" + lat + "&lon=" + lon + "&apiKey=" + geocodeApiKey;

    const response = await fetch(URL1);
    const data = await response.json();

    return Response.json(data);
}
