// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomIntegerNumber = (min, max) => {
  const lowerValue = Math.min(Math.abs(min), Math.abs(max));
  const greaterValue = Math.max(Math.abs(min), Math.abs(max));
  return !isNaN(min, max) && max !== 0 && min !== max ?
    Math.floor(Math.random() * (greaterValue - lowerValue + 1)) + lowerValue : NaN;
};
// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFractionalNumber = (min, max, fract) => {
  const lowerValue = Math.min(Math.abs(min), Math.abs(max));
  const greaterValue = Math.max(Math.abs(min), Math.abs(max));
  return !isNaN(min, max) && max !== 0 && min !== max ?
    ((Math.random() * (greaterValue - lowerValue)) + lowerValue).toFixed(fract) : NaN;
};
// getRandomIntegerNumber(1, 9);
// getRandomFractionalNumber(1.5, 3.5, 2);
const PICTURES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
];
const MIN_PRICE = 1000;
const MAX_PRICE = 100000;
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const ARRAY_LENGTH = 10;
const type = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkin = ['12:00', '13:00', '14:00'];
const checkout = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createAuthor = () => {
  const randomPictureIndex = getRandomIntegerNumber(0, PICTURES.length - 1);
  return randomPictureIndex >= 9 ? { avatar: `img/avatars/user${ PICTURES[randomPictureIndex] }.png` } : { avatar: `img/avatars/user0${ PICTURES[randomPictureIndex] }.png` };
};

const createOffer = () => ({
  title: 'Заголовок',
  address: location.lat + location.lng,
  price: getRandomIntegerNumber(MIN_PRICE, MAX_PRICE),
  type: type[getRandomIntegerNumber(0, type.length - 1)],
  rooms: getRandomIntegerNumber(1, 10),
  guests: getRandomIntegerNumber(1, 10),
  checkin: checkin[getRandomIntegerNumber(0, checkin.length - 1)],
  checkout: checkout[getRandomIntegerNumber(0, checkout.length - 1)],
  features: features.slice(getRandomIntegerNumber(0, features.length - 1)),
  description: 'Какоето описание',
  photos: photos.slice(getRandomIntegerNumber(0, photos.length - 1)),
});

const createLocation = () => ({
  lat: getRandomFractionalNumber(LAT_MIN, LAT_MAX, 5),
  lng: getRandomFractionalNumber(LNG_MIN, LNG_MAX, 5),
});

const createObject = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation(),
});

const similarObjects = Array.from({ length: ARRAY_LENGTH }, createObject);
