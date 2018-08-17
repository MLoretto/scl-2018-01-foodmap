const initMap = function (elementMapa) {
  console.log(elementMapa);
  let mapOptions = {
      center: myLatLong,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.roadmap
  };
  console.log(mapOptions);
  map = new google.maps.Map(elementMapa, mapOptions);
  searchPlaces('');
};
const positionUser = function (elementMapa, functionCall) {
  navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      myLatLong = new google.maps.LatLng(lat, lon);
      functionCall(elementMapa); //se ejecuta la función "functionCall" al momento de cargar la posición.
  });
};
const crearMarcador = function (place, service) {
  let marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: '../img/icon/MapMarker32.png'
  });
  markers.push(marker);
};

