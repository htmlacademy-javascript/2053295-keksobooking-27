const adForm = document.querySelector('.ad-form');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');

const makeInactive = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  adFormElement.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const makeActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  adFormElement.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

export {
  makeInactive,
  makeActive,
};
