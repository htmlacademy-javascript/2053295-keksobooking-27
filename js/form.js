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

const mainFormElement = document.querySelector('.ad-form');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapFiltersElement = document.querySelector('.map__filters');
const priceFieldElement = mainFormElement.querySelector('#price');
const typeFieldElement = mainFormElement.querySelector('#type');
const roomFieldElement = document.querySelector('#room_number');
const guestFieldElement = document.querySelector('#capacity');
const timeInFieldElement = document.querySelector('#timein');
const timeOutFieldElement = document.querySelector('#timeout');
const resetButtonElement = document.querySelector('.ad-form__reset');
const addressFieldElement = document.querySelector('#address');
const rangeSliderElement = document.querySelector('.ad-form__slider');

let minPriceValue = HouseTypeMinPrice[typeFieldElement.value];

const setAddressValue = (coordinates) => {
  addressFieldElement.value = `${coordinates.lat.toFixed(5)} ${coordinates.lng.toFixed(5)}`;
};

const renderSlider = () => {
  if (rangeSliderElement) {
    noUiSlider.create(rangeSliderElement, {
      start: [0],
      connect: false,
      step: 1,
      range: {
        'min': [0],
        'max': [100000]
      }
    });
  }
  rangeSliderElement.noUiSlider.on('update', (values, handle) => {
    priceFieldElement.value = Math.round(values, handle);
  });
};

const pristine = new Pristine(mainFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const onTypeFieldElementChange = (evt) => {
  priceFieldElement.placeholder = HouseTypeMinPrice[evt.target.value];
  minPriceValue = HouseTypeMinPrice[evt.target.value];
  pristine.validate(priceFieldElement);

};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(mainFormElement);
    sendResource(formData);
  }
};

const validatePrice = (value) => value >= minPriceValue;

const getPriceErrorMessage = () => `Минимальное значение ${minPriceValue}`;

pristine.addValidator(priceFieldElement, validatePrice, getPriceErrorMessage);

const onRoomFieldElementChange = () => {

  const selectGuestFieldElementValue = () => {
    if (guestFieldElement.selectedIndex === 3) {
      guestFieldElement.selectedIndex = 0;
    }
    if (guestFieldElement.selectedIndex === 0) {
      guestFieldElement.selectedIndex = 1;
    }
  };

  guestFieldElement.querySelectorAll('option').forEach((e) => {
    e.style.display = 'inline-block';
  });

  let HiddenGuestFields;

  if (roomFieldElement.selectedIndex === 0) {
    selectGuestFieldElementValue();
    guestFieldElement[2].selected = true;
    HiddenGuestFields = NumberRooms.forOneRoom;
  } else if (roomFieldElement.selectedIndex === 1) {
    selectGuestFieldElementValue();
    HiddenGuestFields = NumberRooms.forTwoRoom;
  } else if (roomFieldElement.selectedIndex === 2) {
    selectGuestFieldElementValue();
    HiddenGuestFields = NumberRooms.forThreeRoom;
  } else if (roomFieldElement.selectedIndex === 3) {
    guestFieldElement[roomFieldElement.selectedIndex].selected = true;
    HiddenGuestFields = NumberRooms.forHundredRoom;
  }

  HiddenGuestFields.map((i) => {
    guestFieldElement[i].style.display = 'none';
  });
};

const onTimeInFieldElementChange = () => {
  timeOutFieldElement[timeInFieldElement.selectedIndex].selected = true;
};

const onTimeOutFieldElementChange = () => {
  timeInFieldElement[timeOutFieldElement.selectedIndex].selected = true;
};

const resetData = () => {
  mainFormElement.reset();

  returnToDefaultLocation();
  addressFieldElement.value = `${TOKYO_LAT} ${TOKYO_LNG}`;
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
  resetButtonElement.addEventListener('click', () => renderSimilarAds(offers));
};

const activateFormSubmitRerender = (offers) => {
  mainFormElement.addEventListener('submit', () => renderSimilarAds(offers));
};

const makeInactive = () => {
  mainFormElement.classList.add('ad-form--disabled');
  mapFiltersElement.classList.add('map__filters--disabled');

  adFormElement.forEach((fieldset) => {
    fieldset.disabled = true;
  });

  typeFieldElement.removeEventListener('change', onTypeFieldElementChange);
  roomFieldElement.removeEventListener('change', onRoomFieldElementChange);
  timeInFieldElement.removeEventListener('change', onTimeInFieldElementChange);
  timeOutFieldElement.removeEventListener('change', onTimeOutFieldElementChange);
  mainFormElement.removeEventListener('submit', onFormSubmit);
  resetButtonElement.addEventListener('click', resetFormData);
};

const makeActive = () => {
  mainFormElement.classList.remove('ad-form--disabled');
  mapFiltersElement.classList.remove('map__filters--disabled');
  addressFieldElement.value = `${TOKYO_LAT} ${TOKYO_LNG}`;
  adFormElement.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  renderSlider();
  onRoomFieldElementChange();
  rangeSliderElement.noUiSlider.set(minPriceValue);
  typeFieldElement.addEventListener('change', onTypeFieldElementChange);
  roomFieldElement.addEventListener('change', onRoomFieldElementChange);
  timeInFieldElement.addEventListener('change', onTimeInFieldElementChange);
  timeOutFieldElement.addEventListener('change', onTimeOutFieldElementChange);
  mainFormElement.addEventListener('submit', onFormSubmit);
  resetButtonElement.addEventListener('click', resetFormData);
};

export {
  makeInactive,
  makeActive,
  setAddressValue,
  returnToDefaultLocation,
  resetData,
  activateResetButtonRerender,
  activateFormSubmitRerender,
  resetFormData,
};
