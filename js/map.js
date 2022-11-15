import {
  TOKYO_LAT,
  TOKYO_LNG,
} from './constants.js';
import {
  makeActive,
  getAddressValue,
} from './form.js';
import {
  renderSimilarCard,
} from './similar-items.js';

// let coordinates;
const map = L.map('map-canvas');

const balloonsLayer = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 42],
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
  const coordinates = evt.target.getLatLng();
  getAddressValue(coordinates);
});

const renderSimilarAds = (data) => {
  data.forEach((item) => {
    const { location } = item;
    const lat = location.lat;
    const lng = location.lng;
    const marker = L.marker({
      lat,
      lng
    }, {
      icon,
    }, );
    marker
      .addTo(balloonsLayer)
      .bindPopup(renderSimilarCard(item));
  });
};

const initMap = () => {
  map
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
};

const returnToDefaultLocation = () => {
  mainPinMarker.setLatLng({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  });
  map.setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, 16);
};

export {
  renderSimilarAds,
  returnToDefaultLocation,
  initMap,
};
