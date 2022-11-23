import {
  PriceLevel,
} from './constants.js';
import {
  activateFormSubmitRerender,
  activateResetButtonRerender,
} from './form.js';
import {
  renderSimilarAds,
} from './map.js';

const mapFiltersElement = document.querySelector('.map__filters');
const mapSelectsElement = mapFiltersElement.querySelectorAll('.map__filter');
const featuresFiltersElement = mapFiltersElement.querySelector('.map__features');
const typeFilterElement = mapFiltersElement.querySelector('#housing-type');
const priceFilterElement = mapFiltersElement.querySelector('#housing-price');
const roomsFilterElement = mapFiltersElement.querySelector('#housing-rooms');
const guestsFilterElement = mapFiltersElement.querySelector('#housing-guests');

const onFiltersChange = (offers) => {
  let currentOffers = offers.slice();

  if (typeFilterElement.value !== 'any') {
    currentOffers = currentOffers.filter(
      (item) => item.offer.type === typeFilterElement.value
    );
  }

  if (priceFilterElement.value !== 'any') {
    currentOffers = currentOffers.filter(
      (item) =>
        item.offer.price > PriceLevel[priceFilterElement.value.toUpperCase()].min &&
      item.offer.price <= PriceLevel[priceFilterElement.value.toUpperCase()].max
    );
  }

  if (roomsFilterElement.value !== 'any') {
    currentOffers = currentOffers.filter(
      (item) => +item.offer.rooms === +roomsFilterElement.value
    );
  }

  if (guestsFilterElement.value !== 'any') {
    currentOffers = currentOffers.filter(
      (item) => +item.offer.guests === +guestsFilterElement.value
    );
  }

  const checkedFeaturesElement = mapFiltersElement.querySelectorAll(
    '[type = "checkbox"]:checked'
  );

  if (checkedFeaturesElement.length) {
    currentOffers = currentOffers.filter((item) => {
      if (!item.offer.features || !item.offer.features.length) {
        return false;
      }

      const checkedValues = Array.from(checkedFeaturesElement).map(
        (checkedFeature) => checkedFeature.value
      );

      return checkedValues.every((checkedValue) =>
        item.offer.features.includes(checkedValue)
      );
    });
  }
  renderSimilarAds(currentOffers);
};

const resetFilters = () => {
  mapFiltersElement.reset();
};

const deactivateFilters = () => {
  mapFiltersElement.classList.add('map__filters--disabled');
  mapSelectsElement.forEach((item) => {
    item.disabled = true;
  });
  featuresFiltersElement.disabled = true;
};

const activateFilters = (offers) => {
  mapFiltersElement.classList.remove('map__filters--disabled');
  mapSelectsElement.forEach((item) => {
    item.removeAttribute('disabled');
  });
  featuresFiltersElement.removeAttribute('disabled');
  mapFiltersElement.addEventListener('change', () => onFiltersChange(offers));
  activateResetButtonRerender(offers);
  activateFormSubmitRerender(offers);
};

export {
  activateFilters,
  deactivateFilters,
  resetFilters
};
