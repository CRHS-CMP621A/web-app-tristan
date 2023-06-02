
let HotelsList = []
let AirBnbsList = []

let range = 500;


class Location {

    constructor(coords) {

        this.coords = coords; // lat, lng

    }

}

class AirBnb extends Location {

    type = 'AirBnb';

    constructor(coords, id, name) {

        super(coords);
        this.name = name;
        this.id = id;

    }

    return
}

//Apis
async function closeListings(lat, lng) {
    const url = `https://airbnb-listings.p.rapidapi.com/v2/listingsByLatLng?lat=${lat}&lng=${lng}.7349705&range=${range}&offset=0`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '20b4f70deemsh2516ad2619539b1p13c0c9jsn0d4d91bd427a',
            'X-RapidAPI-Host': 'airbnb-listings.p.rapidapi.com'
        }
    };

            try {
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result);

        let i = 0

        listingDetails(result['results'][i]['airbnb_id'], i);

        

    } catch (error) {
        console.error(error);
    }
}

async function listingDetails(id, i) {

    const url = `https://airbnb-listings.p.rapidapi.com/v2/listing?id=${id}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '20b4f70deemsh2516ad2619539b1p13c0c9jsn0d4d91bd427a',
		'X-RapidAPI-Host': 'airbnb-listings.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();

    let name = result['results'][i]['listingTitle']
    let lat = result['results'][i]['listingLat']
    let lng = result['results'][i]['listingLng']

    Location = new AirBnb([lat,lng], id, name);

    AirBnbsList.push(Location);

    

	console.log(result);
} catch (error) {
	console.error(error);
}

}



navigator.geolocation.getCurrentPosition(

    function (position) {

        //Find Latitude & Longitude
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        closeListings(latitude, longitude);

        //Make coords array
        const coords = [latitude, longitude]

        //Set map view near your coords
        var map = L.map('map').setView(coords, 13);

        //Generate Map
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        //Layer Groups
        var AirBnbs = L.layerGroup(AirBnbsList);
        var Hotels = L.layerGroup(HotelsList);
        
        var baseMaps = {};

        var overlayMaps = {
            "AirBnbs": AirBnbs,
            "Hotels": Hotels
        };

        var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
        
        //Set maker at your coords
        L.marker(coords).addTo(map)
            .bindPopup('Your Current Location')
            .openPopup();

        //Set radius cirlce
        var circle = L.circle(coords, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0,
            radius: range
        }).addTo(map);

        //Display google maps link in console
        console.log("https://www.google.com/maps/@"+latitude+","+longitude+",15z");
        
    },
    function () {

        alert("Could not get position.");

    }

);

