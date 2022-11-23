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
const filtersElement = document.querySelector('.map__filters');
const priceElement = mainFormElement.querySelector('#price');
const typeElement = mainFormElement.querySelector('#type');
const roomElement = document.querySelector('#room_number');
const guestFieldElement = document.querySelector('#capacity');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');
const resetButtonElement = document.querySelector('.ad-form__reset');
const addressFieldElement = document.querySelector('#address');
const rangeSliderElement = document.querySelector('.ad-form__slider');

let minPriceValue = HouseTypeMinPrice[typeElement.value];

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
    priceElement.value = Math.round(values, handle);
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

const onTypeElementChange = (evt) => {
  priceElement.placeholder = HouseTypeMinPrice[evt.target.value];
  minPriceValue = HouseTypeMinPrice[evt.target.value];
  pristine.validate(priceElement);

};

const onMainFormElementSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(mainFormElement);
    sendResource(formData);
  }
};

const validatePrice = (value) => value >= minPriceValue;

const getPriceErrorMessage = () => `Минимальное значение ${minPriceValue}`;

pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);

const onRoomElementChange = () => {

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

  if (roomElement.selectedIndex === 0) {
    selectGuestFieldElementValue();
    guestFieldElement[2].selected = true;
    HiddenGuestFields = NumberRooms.forOneRoom;
  } else if (roomElement.selectedIndex === 1) {
    selectGuestFieldElementValue();
    HiddenGuestFields = NumberRooms.forTwoRoom;
  } else if (roomElement.selectedIndex === 2) {
    selectGuestFieldElementValue();
    HiddenGuestFields = NumberRooms.forThreeRoom;
  } else if (roomElement.selectedIndex === 3) {
    guestFieldElement[roomElement.selectedIndex].selected = true;
    HiddenGuestFields = NumberRooms.forHundredRoom;
  }

  HiddenGuestFields.map((i) => {
    guestFieldElement[i].style.display = 'none';
  });
};

const onTimeInElementChange = () => {
  timeOutElement[timeInElement.selectedIndex].selected = true;
};

const onTimeOutElementChange = () => {
  timeInElement[timeOutElement.selectedIndex].selected = true;
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

const onResetButtonElementClick = (evt) => {
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
  filtersElement.classList.add('map__filters--disabled');

  adFormElement.forEach((fieldset) => {
    fieldset.disabled = true;
  });

  typeElement.removeEventListener('change', onTypeElementChange);
  roomElement.removeEventListener('change', onRoomElementChange);
  timeInElement.removeEventListener('change', onTimeInElementChange);
  timeOutElement.removeEventListener('change', onTimeOutElementChange);
  mainFormElement.removeEventListener('submit', onMainFormElementSubmit);
  resetButtonElement.addEventListener('click', onResetButtonElementClick);
};

const makeActive = () => {
  mainFormElement.classList.remove('ad-form--disabled');
  filtersElement.classList.remove('map__filters--disabled');
  addressFieldElement.value = `${TOKYO_LAT} ${TOKYO_LNG}`;
  adFormElement.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  renderSlider();
  onRoomElementChange();
  rangeSliderElement.noUiSlider.set(minPriceValue);
  typeElement.addEventListener('change', onTypeElementChange);
  roomElement.addEventListener('change', onRoomElementChange);
  timeInElement.addEventListener('change', onTimeInElementChange);
  timeOutElement.addEventListener('change', onTimeOutElementChange);
  mainFormElement.addEventListener('submit', onMainFormElementSubmit);
  resetButtonElement.addEventListener('click', onResetButtonElementClick);
};

export {
  makeInactive,
  makeActive,
  setAddressValue,
  resetData,
  activateResetButtonRerender,
  activateFormSubmitRerender,
};
