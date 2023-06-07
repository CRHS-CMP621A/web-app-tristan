let HotelsList = []
let AirBnbsList = []

let AirBnbMarkers = []
let HotelMarkers = []

let range = 500;

let html;

function format(inputDate) {
    let date, month, year;
  
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return `${year}-${month}-${date}`;
  }
  
const date = format(new Date());


// html = `<ul class="info">
//             <li>${}</li>
//             <li>Name: ${}</li>
//             <li>Rating: ${}</li>
//         </ul>`

let map;
let SearchArea;

class Location {

    constructor(coords) {

        this.coords = coords; // lat, lng



    }

}

class AirBnb extends Location {

    type = 'AirBnb';

    constructor(coords, id, name, rating) {

        super(coords);
        this.name = name;
        this.id = id;
        this.rating = rating;

    }

}

class Hotel extends Location {

    type = 'Hotel';

    constructor(coords, id, name, rating) {

        super(coords);
        this.name = name;
        this.id = id;
        this.rating = rating;

    }

}


async function closeHotel(lat, lng) {

    const url = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotelsByLocation?latitude=${lat}&longitude=${lng}&checkIn=${date}&checkOut=${date}&currencyCode=CAD&distFromMaxDistance=${range}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1cf8fd05cemshacf507ca79e4f1ep1e2913jsn294736aaeac2',
            // 'X-RapidAPI-Key': '8e7df8cbd5msh829b9ca492c6cc9p166913jsnf7983ffebe22',
            // 'X-RapidAPI-Key': '20b4f70deemsh2516ad2619539b1p13c0c9jsn0d4d91bd427a',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        for (let i = 0; i < result.data.data.length; i++){
           
            let id = result['data']['data'][i]['id'];
            HotelDetails(id);

        }

    } catch (error) {
        console.error(error);
    }

}

async function HotelDetails(id) {

    const url = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/getHotelDetails?id=${id}&checkIn=${date}&checkOut=${date}&currency=CAD`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1cf8fd05cemshacf507ca79e4f1ep1e2913jsn294736aaeac2',
            // 'X-RapidAPI-Key': '8e7df8cbd5msh829b9ca492c6cc9p166913jsnf7983ffebe22',
            // 'X-RapidAPI-Key': '20b4f70deemsh2516ad2619539b1p13c0c9jsn0d4d91bd427a',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

            let name = await result['data']['title']
            let lat = await result['data']['geoPoint']['latitude']
            let lng = await result['data']['geoPoint']['longitude']
            let rating = await result['data']['rating']

            Location = new Hotel([lat,lng], id, name, rating);

            HotelsList.push(Location);

    } catch (error) {
        console.error(error);
    }

}

//Apis
async function closeListings(lat, lng) {
    const url = `https://airbnb-listings.p.rapidapi.com/v2/listingsByLatLng?lat=${lat}&lng=${lng}&range=${range}&offset=0`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '90bdbd523cmsh0ed8ac001717b0cp1c45d5jsn4dd183fbf3c9',
            // 'X-RapidAPI-Key': '1cf8fd05cemshacf507ca79e4f1ep1e2913jsn294736aaeac2',
            // 'X-RapidAPI-Key': '8e7df8cbd5msh829b9ca492c6cc9p166913jsnf7983ffebe22',
            // 'X-RapidAPI-Key': '20b4f70deemsh2516ad2619539b1p13c0c9jsn0d4d91bd427a',
            'X-RapidAPI-Host': 'airbnb-listings.p.rapidapi.com'
        }
    };

            try {
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result);

        for (let i = 0; i < result.results.length; i++){
           
            let id = result['results'][i]['airbnb_id'];
            // console.log(id)
            listingDetails(id);

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
        'X-RapidAPI-Key': '90bdbd523cmsh0ed8ac001717b0cp1c45d5jsn4dd183fbf3c9',
        // 'X-RapidAPI-Key': '1cf8fd05cemshacf507ca79e4f1ep1e2913jsn294736aaeac2',
		// 'X-RapidAPI-Key': '8e7df8cbd5msh829b9ca492c6cc9p166913jsnf7983ffebe22',
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

    AirBnbMarkers.push(L.marker(Location.coords).bindPopup(Location.name));

} catch (error) {
	// console.error(error);
}

}

navigator.geolocation.getCurrentPosition(

    function (position) {

        //Find Latitude & Longitude
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        closeListings(latitude, longitude);
        closeHotel(latitude, longitude);

        //Make coords array
        const coords = [latitude, longitude]

        //Make Hotel markers
        for (let hotel of HotelsList) {

            let marker = L.marker(hotel.coords).bindPopup(hotel.name);
        
            console.log(hotel.name);
            HotelMarkers.push(marker);

        }

        //Make Airbnb markers
        for (let airbnb of AirBnbsList) {

            let marker = L.marker(airbnb.coords).bindPopup(airbnb.name);

            console.log(airbnb.name);
            AirBnbMarkers.push(marker);

        }

        //Layer Groups
        var AirBnbs = L.layerGroup(AirBnbMarkers);
        var Hotels = L.layerGroup(HotelMarkers);

        //Set map view near your coords
        var map = L.map('map', {
            center: coords,
            zoom: 13,
            layers: [AirBnbs, Hotels]
        });

        //Generate Map
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

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
        var SearchArea = L.circle(coords, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0,
            radius: range*1000
        }).addTo(map);

        //Display google maps link in console
        console.log("https://www.google.com/maps/@"+latitude+","+longitude+",15z");
        
    },
    function () {

        alert("Could not get position.");

    }

);

// document.querySelector(".button").addEventListener('click', function() {

//     range = Number(document.querySelector(".range").value);

//     if (radius = "" || range <= 0) {

//         range = 500;

//     }
//     console.log(range);

//     SearchArea.bindPopup("I am a circle.");


// })