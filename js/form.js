import {
  HouseTypeMinPrice,
  NumberRooms,
} from './constants.js';
import {
  returnToDefaultLocation,
} from './map.js';
import {
  sendResource,
} from './api.js';
import {
  createSuccessfullySentMessage,
  createErrorSentMessage,
} from './messages.js';

const adForm = document.querySelector('.ad-form');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const priceField = adForm.querySelector('#price');
const typeField = adForm.querySelector('#type');
const roomField = document.querySelector('#room_number');
const guestField = document.querySelector('#capacity');
const timeInField = document.querySelector('#timein');
const timeOutField = document.querySelector('#timeout');
const resetButton = document.querySelector('.ad-form__reset');
const addressField = document.querySelector('#address');
const rangeSlider = document.querySelector('.ad-form__slider');

let minPriceValue = HouseTypeMinPrice[typeField.value];

const setAddressValue = (coordinates) => {
  addressField.value = `${coordinates.lat.toFixed(5)} ${coordinates.lng.toFixed(5)}`;
};

const renderSlider = () => {
  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [0],
      connect: false,
      step: 1,
      range: {
        'min': [0],
        'max': [100000]
      }
    });
  }
  rangeSlider.noUiSlider.on('update', (values, handle) => {
    priceField.value = Math.round(values, handle);
  });
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
  const formData = new FormData(adForm);
  sendResource('https://27.javascript.pages.academy/keksobooking', formData)
    .then(() => {
      adForm.reset();
      createSuccessfullySentMessage();
    })
    .catch(() => {
      createErrorSentMessage();
    });
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
  resetButton.addEventListener('click', returnToDefaultLocation);
};

// Перевод формы в активное состояние
const makeActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  adFormElement.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  renderSlider();
  rangeSlider.noUiSlider.set(minPriceValue);
  typeField.addEventListener('change', onTypeFieldChange);
  roomField.addEventListener('change', onRoomFieldChange);
  timeInField.addEventListener('change', onTimeInFieldChange);
  timeOutField.addEventListener('change', onTimeOutFieldChange);
  adForm.addEventListener('submit', onFormSubmit);
  resetButton.addEventListener('click', returnToDefaultLocation);
};

export {
  resetButton,
  makeInactive,
  makeActive,
  setAddressValue,
};
