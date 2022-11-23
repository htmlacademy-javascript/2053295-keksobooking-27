const MIN_PRICE = 1000;
const MAX_PRICE = 10000;
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const ARRAY_LENGTH = 10;
const TOKYO_LAT = 35.68787;
const TOKYO_LNG = 139.72043;
const MAP_ZOOM = 13;
const RERENDER_DELAY = 500;
const PREVIEW_DEFOLT = 'img/muffin-grey.svg';

const HouseType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
const HouseTypeMinPrice = {
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
const PriceLevel = {
  LOW: {
    min: 0,
    max: 10000,
  },
  MIDDLE: {
    min: 10000,
    max: 50000,
  },
  HIGH: {
    min: 50000,
    max: 100000,
  },
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
  MAP_ZOOM,
  RERENDER_DELAY,
  PREVIEW_DEFOLT,
  HouseType,
  HouseTypeMinPrice,
  NumberRooms,
  PriceLevel,
};
