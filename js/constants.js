
const MIN_PRICE = 1000; //Минимальная цена
const MAX_PRICE = 10000; //Максимальная цена
const LAT_MIN = 35.65000; //Координаты. Минимальная широта
const LAT_MAX = 35.70000; //Координаты. Максимальная широта
const LNG_MIN = 139.70000; //Координаты. Минимальная долгота
const LNG_MAX = 139.80000; //Координаты. Максимальная долгота
const ARRAY_LENGTH = 10; //Длина массива с объектами
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
const NumberRooms = {
  forOneRoom: [0, 1, 3],
  forTwoRoom: [0, 3],
  forThreeRoom: [3],
  forHundredRoom: [0, 1, 2],
};


export {
  MIN_PRICE,
  MAX_PRICE,
  LAT_MIN,
  LAT_MAX,
  LNG_MIN,
  LNG_MAX,
  ARRAY_LENGTH,
  HouseType,
  HouseTypeMinPrice,
  NumberRooms,

};
