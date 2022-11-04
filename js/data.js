import {
  getRandomIntegerNumber,
  getRandomFractionalNumber
} from './util.js';

import {
  MIN_PRICE,
  MAX_PRICE,
  LAT_MIN,
  LAT_MAX,
  LNG_MIN,
  LNG_MAX,
  ARRAY_LENGTH,
} from './constants.js';

import {
  types,
  checkinTimes,
  checkoutTimes,
  features,
  photos
} from './variables.js';

const createAuthor = (index) => ({
  avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`
});

const createOffer = (index, currentLocation) => ({
  title: `Заголовок - ${index}`,
  address: [currentLocation.lat, currentLocation.lng].join('--'),
  price: getRandomIntegerNumber(MIN_PRICE, MAX_PRICE),
  type: types[getRandomIntegerNumber(0, types.length - 1)],
  rooms: getRandomIntegerNumber(1, 5),
  guests: getRandomIntegerNumber(1, 10),
  checkin: checkinTimes[getRandomIntegerNumber(0, checkinTimes.length - 1)],
  checkout: checkoutTimes[getRandomIntegerNumber(0, checkoutTimes.length - 1)],
  features: features.slice(getRandomIntegerNumber(0, features.length - 1)),
  description: `Описание - ${index}`,
  photos: photos.slice(getRandomIntegerNumber(0, photos.length - 1)),
});

const createLocation = () => ({
  lat: getRandomFractionalNumber(LAT_MIN, LAT_MAX, 5),
  lng: getRandomFractionalNumber(LNG_MIN, LNG_MAX, 5),
});

const createObject = (index) => {
  const currentLocation = createLocation();

  return {
    author: createAuthor(index),
    offer: createOffer(index, currentLocation),
    location: currentLocation,
  };
};

const getSimilarObjectsData = () => Array.from({
  length: ARRAY_LENGTH
}, (_, i) => createObject(i + 1));

export {
  getSimilarObjectsData,
  createAuthor,

};
