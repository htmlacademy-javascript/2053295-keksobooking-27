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

let pictureIndex = 0; //Индекс аватарки
const createLocation = () => ({
  lat: getRandomFractionalNumber(LAT_MIN, LAT_MAX, 5),
  lng: getRandomFractionalNumber(LNG_MIN, LNG_MAX, 5),
});
const coordinates = createLocation();
const createAuthor = () => {
  pictureIndex += 1;
  return {
    avatar: `img/avatars/user${pictureIndex.toString().padStart(2, '0')}.png`
  };
};
const createOffer = () => ({
  title: 'Заголовок',
  address: [coordinates.lat, coordinates.lng].join('--'),
  price: getRandomIntegerNumber(MIN_PRICE, MAX_PRICE),
  type: types[getRandomIntegerNumber(0, types.length - 1)],
  rooms: getRandomIntegerNumber(),
  guests: getRandomIntegerNumber(),
  checkin: checkinTimes[getRandomIntegerNumber(0, checkinTimes.length - 1)],
  checkout: checkoutTimes[getRandomIntegerNumber(0, checkoutTimes.length - 1)],
  features: features.slice(getRandomIntegerNumber(0, features.length - 1)),
  description: 'Какоето описание',
  photos: photos.slice(getRandomIntegerNumber(0, photos.length - 1)),
});
const createObject = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: coordinates,
});
const similarObjects = () => Array.from({
  length: ARRAY_LENGTH
}, createObject);

export {
  similarObjects
};

