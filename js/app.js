var map;
var infowindow;
var contenedor;
var service;
var myLatlng;
var markers = [];

function initMap() {
    contenedor = document.getElementById('lugares');
    navigator.geolocation.getCurrentPosition(function (pos) {

        lat = pos.coords.latitude;
        lon = pos.coords.longitude;

        myLatlng = new google.maps.LatLng(lat, lon);

        var mapOptions = {
            center: myLatlng,
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.roadmap
        };

        map = new google.maps.Map(document.getElementById("mapa"), mapOptions);

        infowindow = new google.maps.InfoWindow();

        var request = {
            location: myLatlng,
            radius: 100,
            types: ['restaurant']
        };

        service = new google.maps.places.PlacesService(map); // Creamos el servicio PlaceService y se envía la petición.
        service.nearbySearch(request, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                    crearMarcador(results[i], service);
                    crearListado(results[i]);

                }
            }
        });
    });
}
function searchLocal(){
    let contenedor = document.getElementById('lugares');
    contenedor.innerText = '';
    let busqueda = document.getElementById('txtSearch').value;
    var request = {
        location: myLatlng,
        radius: '100',
        query: busqueda
      };
      document.getElementById('txtSearch').value = '';
      clearMarkers();
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, function(results, status){
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                crearMarcador(results[i], service);
                crearListado(results[i]);
            }
        }
    });
}
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
  function clearMarkers() {
    var mapOptions = {
        center: myLatlng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.roadmap
    };
    map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
  }

  function crearMarcador(place, service) { // Creción de un marcador
    
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: '../img/icon/MapMarker32.png'
    });
    
    google.maps.event.addListener(marker, 'click', function () { // Asignación de evento click del marcador
        document.getElementById('restaurantInfoTitle').innerText = place.name;
        document.getElementById('direccionPop').innerText = place.vicinity;
        if (place.photos) {
            document.getElementById('imgPop').src = place.photos[0].getUrl({ 'maxWidth': 250, 'maxHeight': 350 });
        }else{
            document.getElementById('imgPop').src = place.icon;
        }
        $('#restaurantInfo').modal('show');
        service.getDetails({
            placeId: place.place_id
        }, function (placeDetails, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log(placeDetails);
            }
        });
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
function ShowPopUp(id){
    service.getDetails({
        placeId: id
        }, function (placeDetails, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log(placeDetails);
                document.getElementById('restaurantInfoTitle').innerText = placeDetails.name;
                document.getElementById('direccionPop').innerText = 'Direccion:' + placeDetails.vicinity;
                document.getElementById('raitingPop').innerText = 'Raiting:' + placeDetails.rating;
                if(placeDetails.website){
                    document.getElementById('websitePop').innerText = 'Webbbsite:' + placeDetails.website;
                }else{
                    document.getElementById('websitePop').innerText = '';
                }
                if (placeDetails.photos) {
                    document.getElementById('imgPop').src = placeDetails.photos[0].getUrl({ 'maxWidth': 250, 'maxHeight': 350 });
                }else{
                    document.getElementById('imgPop').src = placeDetails.icon;
                }
                $('#restaurantInfo').modal('show');
            }
    });
} 

function crearListado(place) {
/*
    <div class="row itemRest">
        <div class="col-5">
            <img src="../img/rest1.png" />
        </div>
        <div class="col-7">
            <div class="row">
                <h4>Titulo restaurant</h4>
            </div>
        </div>
    </div>
*/
     let contenedor = document.getElementById('lugares');
     let divItem = document.createElement('div');
     divItem.classList = 'row itemRest';
     let divImg = document.createElement('div');
     divImg.classList = 'col-5';
     let img = document.createElement('img');
     if (place.photos) {
        img.setAttribute('src', place.photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 80 }));
    }else{
        img.setAttribute('src', place.icon);
    }
     img.className = 'imgpost';
     divImg.appendChild(img);
     divItem.appendChild(divImg);
     let divContent = document.createElement('div');
     divContent.classList = 'col-7';
     let rowTitleContent = document.createElement('div');
     rowTitleContent.classList = 'row';
    let HTitleContent = document.createElement('h6');
    HTitleContent.innerText = place.name;
    let aTitleContent = document.createElement('a');
    aTitleContent.href = 'javascript:ShowPopUp("'+ place.place_id + '");';
    aTitleContent.appendChild(HTitleContent);
    rowTitleContent.appendChild(aTitleContent);
    divContent.appendChild(rowTitleContent);
    divItem.appendChild(divContent);
    contenedor.appendChild(divItem)
}
initMap();
