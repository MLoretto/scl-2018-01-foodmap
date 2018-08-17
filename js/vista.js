const initApp = function (){
  console.log('iniciando');
  positionUser(document.getElementById('mapa'),initMap);
  positionUser(document.getElementById('mapa'),searchPlaces);

}

const crearMarcador = function (place, service) { 
    let marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: '../img/icon/MapMarker32.png'
    });
}

const crearListado = function (place) {
    let contenedor = document.getElementById('lugares');
    console.log(contenedor);
    let srcImg;
    if (place.photos) {
      srcImg = place.photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 80 });
    }else{
      srcImg =  place.icon;
    }    

    let row = `
        <div class="row itemRest align-items-center">
            <div class="col-5">
                <img class="imgPost" src="${srcImg}" />
            </div>
            <div class="col-7">
                <div class="row">
                    <a href="javascript:showModal("${place.place_id}");">
                        <h6>${place.name}</h6>
                    </a>
                </div>
            </div>
        </div>
    `;
    console.log(row);
    contenedor.innerHTML += row;
  }

console.log('evento body');
document.getElementsByTagName("body")[0].addEventListener("load", initApp());