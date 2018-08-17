const initApp = function () {
    positionUser(document.getElementById('mapa'), initMap);
};
const crearListado = function (place) {
    let contenedor = document.getElementById('lugares');
    let srcImg;
    if (place.photos) {
        srcImg = place.photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 80 });
    } else {
        srcImg = place.icon;
    }
    let row = `
        <div class="row itemRest align-items-center">
            <div class="col-5">
                <img class="imgPost" src="${srcImg}" />
            </div>
            <div class="col-7">
                <div class="row">
                    <a href="javascript:showModal('${place.place_id}');">
                        <h6>${place.name}</h6>
                    </a>
                </div>
            </div>
        </div>
    `;
    contenedor.innerHTML += row;
};

const searchLocal = function () {
    let queryText = document.getElementById('txtSearch').value; 
    console.log('busqueda: ' + queryText);
    searchPlaces(queryText);
};
const showModal = function (placeId) {
    service.getDetails({
        placeId: placeId
        },
        function (placeDetails, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(placeDetails);
                document.getElementById('restaurantInfoTitle').innerText = placeDetails.name;
                document.getElementById('direccionPop').innerText = 'Direccion:' + placeDetails.vicinity;
                document.getElementById('raitingPop').innerText = 'Raiting:' + placeDetails.rating;
                if (placeDetails.website) {
                    document.getElementById('websitePop').innerText = 'Webbbsite:' + placeDetails.website;
                } else {
                    document.getElementById('websitePop').innerText = '';
                }
                if (placeDetails.photos) {
                    document.getElementById('imgPop').src = placeDetails.photos[0].getUrl({ 'maxWidth': 250, 'maxHeight': 350 });
                } else {
                    document.getElementById('imgPop').src = placeDetails.icon;
                }
                $('#restaurantInfo').modal('show');
            }
        });
};
console.log('evento body');
document.getElementsByTagName("body")[0].addEventListener("load", initApp());