let map;
let myLatLong;
let markers = [];
let service;

const searchPlaces = function (textQuery) {
    console.log('searchPlaces');
    console.log(textQuery);
    let request;
    if (textQuery === '') {
        request = {
            location: myLatLong,
            radius: 100,
            types: ['restaurant']
        };
    } else {
        request = {
            location: myLatLong,
            radius: '100',
            query: textQuery
        };
    }
    console.log(request);
    let contenedor = document.getElementById('lugares');
    contenedor.innerHTML = '';
    eliminarMarkers();
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                crearMarcador(results[i], service);
                crearListado(results[i]);
            }
        }
    });
};
const setMapOnAll = function (map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
};
const eliminarMarkers = function () {
    setMapOnAll(null);
    markers = [];
};