import {geocodeApiKey} from "@/DO_NOT_PUSH";

export async function GET(request: Request) {

    const url = new URL(request.url);
    const message = url.searchParams.get('name');

    // add apikey when building
    let URL1 = "https://api.geoapify.com/v1/geocode/search?text=" + message + "&apiKey=" + geocodeApiKey;

    const response = await fetch(URL1);
    const data = await response.json();

    return Response.json(data);
}
