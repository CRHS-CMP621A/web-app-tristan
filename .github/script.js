
let HotelsList = []
let AirBnbsList = []

<<<<<<< HEAD
let range = 500;

class Location {

    constructor(coords) {

        this.coords = coords; // lat, lng

=======
class AirBnb {

    constructor(coords, name, price, link) {

        this.coords = coords; // [lng, lat]
        this.name = name;  // House name
        this.price = price; // how much to rent
        this.link = link; // link to page
>>>>>>> 37875a06c4dc108426174a9293ea2e4a8d2090a8
    }

}

<<<<<<< HEAD
class AirBnb extends Location {

    type = 'AirBnb';

    constructor(coords, id, name, rating) {

        super(coords);
        this.name = name;
        this.id = id;
        this.rating = rating;

    }

    return
}

//Apis
async function closeListings(lat, lng) {
    const url = `https://airbnb-listings.p.rapidapi.com/v2/listingsByLatLng?lat=${lat}&lng=${lng}.7349705&range=${range}&offset=0`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8e7df8cbd5msh829b9ca492c6cc9p166913jsnf7983ffebe22',
            // 'X-RapidAPI-Key': '20b4f70deemsh2516ad2619539b1p13c0c9jsn0d4d91bd427a',
            'X-RapidAPI-Host': 'airbnb-listings.p.rapidapi.com'
        }
    };

            try {
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result);

        for (let i = 0; i < result.results.length; i++){

            listingDetails(result['results'][i]['airbnb_id']);

        }


    } catch (error) {
        console.error(error);
    }
}

async function listingDetails(id) {

    const url = `https://airbnb-listings.p.rapidapi.com/v2/listing?id=${id}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8e7df8cbd5msh829b9ca492c6cc9p166913jsnf7983ffebe22',
        // 'X-RapidAPI-Key': '20b4f70deemsh2516ad2619539b1p13c0c9jsn0d4d91bd427a',
		'X-RapidAPI-Host': 'airbnb-listings.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();

    console.log(result);

    let name = result['results'][0]['listingTitle']
    let lat = result['results'][0]['listingLat']
    let lng = result['results'][0]['listingLng']
    let rating = result['results'][0]['starRating']

    Location = new AirBnb([lat,lng], id, name, rating);

    AirBnbsList.push(Location);

} catch (error) {
	console.error(error);
}

}

=======
>>>>>>> 37875a06c4dc108426174a9293ea2e4a8d2090a8
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

