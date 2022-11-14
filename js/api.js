import {
  map,
} from './map.js';
import {
  renderSimilarCard,
} from './similar-items.js';

const getResourse = async (url) => {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
  }

  const receivedData = await response.json();

  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 42],
  });

  receivedData.forEach((item) => {
    const {location} = item;
    const lat = location.lat;
    const lng = location.lng;
    const marker = L.marker({
      lat,
      lng
    }, {
      icon,
    }, );
    marker
      .addTo(map)
      .bindPopup(renderSimilarCard(item));
  });
};

export {
  getResourse,

};
