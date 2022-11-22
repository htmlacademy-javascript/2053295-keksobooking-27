import {
  HouseTypeMinPrice,
  NumberRooms,
  TOKYO_LAT,
  TOKYO_LNG,
} from './constants.js';
import {
  renderSimilarAds,
  returnToDefaultLocation,
} from './map.js';
import {
  sendResource,
} from './api.js';
import {
  avatarRemove,
} from './avatar.js';
import {
  photoRemove,
} from './housing-photo.js';
import { resetFilters } from './filter.js';

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
    const formData = new FormData(adForm);
    sendResource(formData);
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

  if (roomField.selectedIndex === 0) {
    selectGuestFieldValue();
    guestField[2].selected = true;
    HiddenGuestFields = NumberRooms.forOneRoom;
  } else if (roomField.selectedIndex === 1) {
    selectGuestFieldValue();
    HiddenGuestFields = NumberRooms.forTwoRoom;
  } else if (roomField.selectedIndex === 2) {
    selectGuestFieldValue();
    HiddenGuestFields = NumberRooms.forThreeRoom;
  } else if (roomField.selectedIndex === 3) {
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

const resetData = () => {
  adForm.reset();

  returnToDefaultLocation();
  addressField.value = `${TOKYO_LAT} ${TOKYO_LNG}`;
  avatarRemove();
  photoRemove();
  pristine.reset();
  resetFilters();
};

const resetFormData = (evt) => {
  evt.preventDefault();
  resetData();
};

const activateResetButtonRerender = (offers) => {
  resetButton.addEventListener('click', () => renderSimilarAds(offers));
};

const activateFormSubmitRerender = (offers) => {
  adForm.addEventListener('submit', () => renderSimilarAds(offers));
};

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
  resetButton.addEventListener('click', resetFormData);
};

const makeActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  addressField.value = `${TOKYO_LAT} ${TOKYO_LNG}`;
  adFormElement.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  renderSlider();
  onRoomFieldChange();
  rangeSlider.noUiSlider.set(minPriceValue);
  typeField.addEventListener('change', onTypeFieldChange);
  roomField.addEventListener('change', onRoomFieldChange);
  timeInField.addEventListener('change', onTimeInFieldChange);
  timeOutField.addEventListener('change', onTimeOutFieldChange);
  adForm.addEventListener('submit', onFormSubmit);
  resetButton.addEventListener('click', resetFormData);
};

export {
  resetButton,
  makeInactive,
  makeActive,
  setAddressValue,
  returnToDefaultLocation,
  resetData,
  activateResetButtonRerender,
  activateFormSubmitRerender,
};
