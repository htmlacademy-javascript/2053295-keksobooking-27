import {
  getSimilarObjectsData,
} from './data.js';
import {
  renderSimilarCards,
} from './similar-items.js';
import {
  makeInactive,
  makeActive,
} from './form.js';

renderSimilarCards(getSimilarObjectsData().slice(0, 1));
makeInactive();

const addressField = document.querySelector('#address');
let coordinates = {};
const getAddressValue = () => {
  addressField.value = `${coordinates.lat.toFixed(5)} ${coordinates.lng.toFixed(5)}`;
};

const resetButton = document.querySelector('.ad-form__reset');

const map = L.map('map-canvas')
  .on('load', () => {
    makeActive();
  })
  .setView({
    lat: 35.6895,
    lng: 139.692,
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
  lat: 35.6895,
  lng: 139.692,
}, {
  draggable: true,
  icon: mainPinIcon,
}, );

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  coordinates = evt.target.getLatLng();
  getAddressValue();
});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 35.6895,
    lng: 139.692,
  });
  map.setView({
    lat: 35.6895,
    lng: 139.692,
  }, 16);
});

// const icon = L.icon({
//   iconUrl: './img/pin.svg',
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
// });

// const createCustomPopup = (point) => {
//   const balloonTemplate = document.querySelector('#balloon').content.querySelector('.balloon');
//   const popupElement = balloonTemplate.cloneNode(true);

//   popupElement.querySelector('.balloon__title').textContent = point.title;
//   popupElement.querySelector('.balloon__lat-lng').textContent = `Координаты: ${point.lat}, ${point.lng}`;

//   return popupElement;
// };

// const createMarker = (point) => {
//   const { lat, lng } = point;
//   const marker = L.marker({
//     lat,
//     lng,
//   }, {
//     icon,
//   }, );
//   marker
//     .addTo(map)
//     .bindPopup(createCustomPopup(point));
// };
