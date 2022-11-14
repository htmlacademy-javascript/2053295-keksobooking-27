const MIN_PRICE = 1000; //Минимальная цена
const MAX_PRICE = 10000; //Максимальная цена
const LAT_MIN = 35.65000; //Координаты. Минимальная широта
const LAT_MAX = 35.70000; //Координаты. Максимальная широта
const LNG_MIN = 139.70000; //Координаты. Минимальная долгота
const LNG_MAX = 139.80000; //Координаты. Максимальная долгота
const ARRAY_LENGTH = 10; //Длина массива с объектами
const TOKYO_LAT = 35.6895; //Широта Токио
const TOKYO_LNG = 139.692; //Долгота Токио

const HouseType = { //Русские значения видов жилья
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
const HouseTypeMinPrice = { //Минимальные значения стоимости жилья
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

export {
  MIN_PRICE,
  MAX_PRICE,
  LAT_MIN,
  LAT_MAX,
  LNG_MIN,
  LNG_MAX,
  ARRAY_LENGTH,
  TOKYO_LAT,
  TOKYO_LNG,
  HouseType,
  HouseTypeMinPrice,
};
