import {
  HouseTypeMinPrice,
} from './constants.js';

const adForm = document.querySelector('.ad-form');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const priceField = adForm.querySelector('#price');
const typeField = adForm.querySelector('#type');
const roomField = document.querySelector('#room_number');
const guestField = document.querySelector('#capacity');
const timeInField = document.querySelector('#timein');
const timeOutField = document.querySelector('#timeout');
const submitButton = document.querySelector('.ad-form__element--submit');
let minPriceValue = HouseTypeMinPrice[typeField.value];

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

const onSubmitButtonPush = (evt) => {
  evt.preventDefault();
  // const isValid = pristine.validate();
  // if (isValid) {
  //   console.log('Можно отправлять');
  // } else {
  //   console.log('Форма невалидна');
  // }
};
const validatePrice = (value) => value >= minPriceValue;

const getPriceErrorMessage = () => `Минимальное значение ${minPriceValue}`;

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const getGuestValue = () => {

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
    HiddenGuestFields = [0, 1, 3];
  } else if (roomField.selectedIndex === 1) { // 2 КОМНАТЫ
    selectGuestFieldValue();
    HiddenGuestFields = [0, 3];
  } else if (roomField.selectedIndex === 2) { // 3 КОМНАТЫ
    selectGuestFieldValue();
    HiddenGuestFields = [3];
  } else if (roomField.selectedIndex === 3) { // 100 КОМНАТ
    guestField[roomField.selectedIndex].selected = true;
    HiddenGuestFields = [0, 1, 2];
  }

  HiddenGuestFields.map((i) => {
    guestField[i].style.display = 'none';
  });

};

const setTimeOutFieldValue = () => {
  timeOutField[timeInField.selectedIndex].selected = true;
};

const setTimeInFieldValue = () => {
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
  roomField.removeEventListener('change', getGuestValue);
  timeInField.removeEventListener('change', setTimeOutFieldValue);
  timeOutField.removeEventListener('change', setTimeInFieldValue);
  submitButton.removeEventListener('submit', onSubmitButtonPush);
};

// Перевод формы в активное состояние
const makeActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  adFormElement.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  typeField.addEventListener('change', onTypeFieldChange);
  roomField.addEventListener('change', getGuestValue);
  timeInField.addEventListener('change', setTimeOutFieldValue);
  timeOutField.addEventListener('change', setTimeInFieldValue);
  submitButton.addEventListener('submit', onSubmitButtonPush);
};

export {
  makeInactive,
  makeActive,
};
