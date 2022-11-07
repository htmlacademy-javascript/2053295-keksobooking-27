const adForm = document.querySelector('.ad-form');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const titleField = adForm.querySelector('#title');
const priceField = adForm.querySelector('#price');
const typeField = adForm.querySelector('#type');
const minPriceValue = 0;
const priceValue = {
  min: minPriceValue,
};
const titleValue = {
  max: 100,
  min: 30,
};
// Перевод формы в не активное состояние
const makeInactive = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  adFormElement.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};
// Перевод формы в не активное состояние
const makeActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  adFormElement.forEach((fieldset) => {
    fieldset.disabled = false;
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
const validateTitle = (value) => value > titleValue.min && value <= titleValue.max;
pristine.addValidator(titleField, validateTitle, );
// Цена за ночь:
const validatePrice = (value) => value > priceValue.min && value <= priceValue.max;
typeField.addEventListener('change', () => {
  let maxPriceValue;
  let pricePlaceholder = priceField.placeholder;
  const getPriceValue = () => {
    if (typeField.value === 'bungalow') {
      maxPriceValue = 0;
      pricePlaceholder = 0;
    } else if (typeField.value === 'flat') {
      maxPriceValue = 1000;
      pricePlaceholder = 1000;
    } else if (typeField.value === 'hotel') {
      maxPriceValue = 3000;
      pricePlaceholder = 3000;
    } else if (typeField.value === 'house') {
      maxPriceValue = 5000;
      pricePlaceholder = 5000;
    } else if (typeField.value === 'palace') {
      maxPriceValue = 10000;
      pricePlaceholder = 10000;
    }
    priceField.placeholder = pricePlaceholder;
    priceValue.max = maxPriceValue;
    return priceValue.max;
  };
  getPriceValue();
});

function getPriceErrorMessage(value) {
  if (value < priceValue.min) {
    return `Минимальное значение ${priceValue.min}`;
  } else if (value > priceValue.max) {
    return `Максимальное значение ${priceValue.max}`;
  }
}
pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const roomField = document.querySelector('#room_number');
const guestField = document.querySelector('#capacity');

roomField.addEventListener('change', () => {

  const getGuestFieldValue = () => {
    for (let i = 0; i < guestField.length; i++) {
      guestField[i].style.display = 'inline-block';
    }
    if (roomField.value === '1') {
      guestField[2].selected = true;
      guestField[1].style.display = 'none';
      guestField[0].style.display = 'none';
      guestField[3].style.display = 'none';
    } else if (roomField.value === '2') {
      guestField[1].selected = true;
      guestField[0].style.display = 'none';
      guestField[3].style.display = 'none';
    } else if (roomField.value === '3') {
      guestField[0].selected = true;
      guestField[3].style.display = 'none';
    } else if (roomField.value === '100') {
      guestField[3].selected = true;
      guestField[0].style.display = 'none';
      guestField[1].style.display = 'none';
      guestField[2].style.display = 'none';
    }
  };
  getGuestFieldValue();
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


// adForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const isValid = pristine.validate();
//   if (isValid) {
//     console.log('Можно отправлять');
//   } else {
//     console.log('Форма невалидна');
//   }
// });


export {
  makeInactive,
  makeActive,
};
