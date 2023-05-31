
let HotelsList = []
let AirBnbsList = []

class AirBnb {

    constructor(coords, name, price, link) {

        this.coords = coords; // [lng, lat]
        this.name = name;  // House name
        this.price = price; // how much to rent
        this.link = link; // link to page
    }

}

navigator.geolocation.getCurrentPosition(

    function (position) {

        //Find Latitude & Longitude
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

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
            radius: 500
        }).addTo(map);

        //Display google maps link in console
        console.log("https://www.google.com/maps/@"+latitude+","+longitude+",15z");
        
    },
    function () {

        alert("Could not get position.");

    }

);
