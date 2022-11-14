import {
  TOKYO_LAT,
  TOKYO_LNG,
} from './constants.js';
import {
  makeActive,
  getAddressValue,
  // coordinates,
} from './form.js';


let coordinates;
const map = L.map('map-canvas')
  .on('load', () => {
    makeActive();
  })
  .setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, 16);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({
  lat: TOKYO_LAT,
  lng: TOKYO_LNG,
}, {
  draggable: true,
  icon: mainPinIcon,
}, );

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  coordinates = evt.target.getLatLng();
  getAddressValue();
});


export {
  map,
  coordinates,
  mainPinMarker,
};
