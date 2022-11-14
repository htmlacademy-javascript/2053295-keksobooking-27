import {
  HouseTypeMinPrice,
  TOKYO_LAT,
  TOKYO_LNG,
  NumberRooms,
} from './constants.js';
import {
  coordinates,
  map,
  mainPinMarker,
} from './map.js';

const adForm = document.querySelector('.ad-form');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const priceField = adForm.querySelector('#price');
const typeField = adForm.querySelector('#type');
const roomField = document.querySelector('#room_number');
const guestField = document.querySelector('#capacity');
const timeInField = document.querySelector('#timein');
const timeOutField = document.querySelector('#timeout');

// const submitButton = document.querySelector('.ad-form__element--submit');
const resetButton = document.querySelector('.ad-form__reset');
const addressField = document.querySelector('#address');

let minPriceValue = HouseTypeMinPrice[typeField.value];

const getAddressValue = () => {
  addressField.value = `${coordinates.lat.toFixed(5)} ${coordinates.lng.toFixed(5)}`;
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const onTypeFieldChange = (evt) => {
  priceField.placeholder = HouseTypeMinPrice[evt.target.value];
  minPriceValue = HouseTypeMinPrice[evt.target.value];
  pristine.validate(priceField);
};

const onFormSubmit = (evt) => {

  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    adForm.submit();
  }

};
const validatePrice = (value) => value >= minPriceValue;

const getPriceErrorMessage = () => `Минимальное значение ${minPriceValue}`;

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);


const onRoomFieldChange = () => {

  const selectGuestFieldValue = () => {
    if (guestField.selectedIndex === 3) {
      guestField.selectedIndex = 0;
    }
    if (guestField.selectedIndex === 0) {
      guestField.selectedIndex = 1;
    }
  };

  for (let i = 0; i < guestField.length; i++) {
    guestField[i].style.display = 'inline-block';
  }

  let HiddenGuestFields;

  if (roomField.selectedIndex === 0) { // 1 КОМНАТА
    selectGuestFieldValue();
    guestField[2].selected = true;
    HiddenGuestFields = NumberRooms.forOneRoom;
  } else if (roomField.selectedIndex === 1) { // 2 КОМНАТЫ
    selectGuestFieldValue();
    HiddenGuestFields = NumberRooms.forTwoRoom;
  } else if (roomField.selectedIndex === 2) { // 3 КОМНАТЫ
    selectGuestFieldValue();
    HiddenGuestFields = NumberRooms.forThreeRoom;
  } else if (roomField.selectedIndex === 3) { // 100 КОМНАТ
    guestField[roomField.selectedIndex].selected = true;
    HiddenGuestFields = NumberRooms.forHundredRoom;
  }

  HiddenGuestFields.map((i) => {
    guestField[i].style.display = 'none';
  });
};

const onTimeInFieldChange = () => {
  timeOutField[timeInField.selectedIndex].selected = true;
};

const onTimeOutFieldChange = () => {
  timeInField[timeOutField.selectedIndex].selected = true;
};

// Перевод формы в не активное состояние
const makeInactive = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  adFormElement.forEach((fieldset) => {
    fieldset.disabled = true;
  });

  typeField.removeEventListener('change', onTypeFieldChange);
  roomField.removeEventListener('change', onRoomFieldChange);
  timeInField.removeEventListener('change', onTimeInFieldChange);
  timeOutField.removeEventListener('change', onTimeOutFieldChange);
  adForm.removeEventListener('submit', onFormSubmit);

};

makeInactive();

// Перевод формы в активное состояние
const makeActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  adFormElement.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  onRoomFieldChange();

  typeField.addEventListener('change', onTypeFieldChange);
  roomField.addEventListener('change', onRoomFieldChange);
  timeInField.addEventListener('change', onTimeInFieldChange);
  timeOutField.addEventListener('change', onTimeOutFieldChange);
  adForm.addEventListener('submit', onFormSubmit);
};

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  });
  map.setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, 16);
});

export {
  resetButton,
  makeActive,
  getAddressValue,
};
