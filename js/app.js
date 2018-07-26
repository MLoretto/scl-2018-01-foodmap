var map;
var infowindow;
var contenedor;
function initMap() {
    contenedor = document.getElementById('lugares');
    // Creamos un mapa con las coordenadas actuales
    navigator.geolocation.getCurrentPosition(function (pos) {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
        var myLatlng = new google.maps.LatLng(lat, lon);
        var mapOptions = {
            center: myLatlng,
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.roadmap
        };
        map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
        // Creamos el infowindow
        infowindow = new google.maps.InfoWindow();
        // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
        var request = {
            location: myLatlng,
            radius: 100,
            types: ['restaurant']
        };
        // Creamos el servicio PlaceService y enviamos la petición.
        var service = new google.maps.places.PlacesService(map);
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
function crearMarcador(place, service) {
    // Creamos un marcador
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: '../img/icon/MapMarker32.png'
    });
    // Asignamos el evento click del marcador
    google.maps.event.addListener(marker, 'click', function () {
        console.log(place);
        if (place.photos) {
            for (var i = 0; i < place.photos.length; i++) {
                console.log(place.photos[i].getUrl({ 'maxWidth': 350, 'maxHeight': 350 }));
            }
        }
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
     rowTitleContent.appendChild(HTitleContent);
     divContent.appendChild(rowTitleContent);
     divItem.appendChild(divContent);
     contenedor.appendChild(divItem)
}
initMap();
