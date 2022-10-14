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
const MIN_PRICE = 1000; //Минимальная цена
const MAX_PRICE = 100000; //Максимальная цена
const LAT_MIN = 35.65000; //Координаты. Минимальная широта
const LAT_MAX = 35.70000; //Координаты. Максимальная широта
const LNG_MIN = 139.70000; //Координаты. Минимальная долгота
const LNG_MAX = 139.80000; //Координаты. Максимальная долгота
const ARRAY_LENGTH = 10; //Длина массива с объектами
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel']; //Тип жилья
const checkinTimes = ['12:00', '13:00', '14:00']; //Время заезда
const checkoutTimes = ['12:00', '13:00', '14:00']; //Время выезда
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; //Доп. опции
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg', //Фотографии
];
let pictureIndex = 0; //Индекс аватарки
const createLocation = () => ({
  lat: getRandomFractionalNumber(LAT_MIN, LAT_MAX, 5),
  lng: getRandomFractionalNumber(LNG_MIN, LNG_MAX, 5),
});
const coordinates = createLocation();
const createAuthor = () => {
  pictureIndex += 1;
  return { avatar: `img/avatars/user${pictureIndex.toString().padStart(2, '0')}.png` };
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
const similarObjects = () => Array.from({ length: ARRAY_LENGTH }, createObject);

similarObjects();
