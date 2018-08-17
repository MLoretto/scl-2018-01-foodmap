let map;

const initMap = function (elementMapa, myLatLong){
    console.log(elementMapa);
    let mapOptions = { 
        center: myLatLong, 
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.roadmap 
      };
    console.log(mapOptions);  

    map = new google.maps.Map(elementMapa, mapOptions); 
}

const positionUser = function (elementMapa, functionCall){
    let googleLatlong = navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude; 
        let lon = position.coords.longitude; 
        let myLatLong = new google.maps.LatLng(lat, lon);
        functionCall(elementMapa, myLatLong); //se ejecuta la función "functionCall" al momento de cargar la posición.
    });
}

const searchPlaces = function(elementMapa, myLatLong, textQuery){
    console.log('searchPlaces');
    if(!textQuery)
      textQuery = '';
    let request = { 
      location: myLatLong,
      radius: 100,
      types: ['restaurant']//,
      //query: textQuery
    };
     console.log(request);


    service = new google.maps.places.PlacesService(map); 
    service.textSearch(request, function(results, status){
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        for (let i = 0; i < results.length; i++) {
          console.log(results[i]);
          crearMarcador(results[i], service);
          crearListado(results[i]);
        }
      } 
    });
}