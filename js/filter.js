// // Функция debounce для устранения дребезга:
// const debounce = (callback, timeoutDelay = 500) => {
//   // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
//   // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
//   let timeoutId;
//   return (...rest) => {
//     // Перед каждым новым вызовом удаляем предыдущий таймаут,
//     // чтобы они не накапливались
//     clearTimeout(timeoutId);
//     // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
//     timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
//     // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
//     // пока действие совершается чаще, чем переданная задержка timeoutDelay
//   };
// };
// // Функция throttle для пропуска кадров:
// const throttle = (callback, delayBetweenFrames) => {
//   // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
//   // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
//   let lastTime = 0;
//   return (...rest) => {
//     // Получаем текущую дату в миллисекундах,
//     // чтобы можно было в дальнейшем
//     // вычислять разницу между кадрами
//     const now = new Date();
//     // Если время между кадрами больше задержки,
//     // вызываем наш колбэк и перезаписываем lastTime
//     // временем "последнего кадра"
//     if (now - lastTime >= delayBetweenFrames) {
//       callback.apply(this, rest);
//       lastTime = now;
//     }
//   };
// };


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

const mapFilters = document.querySelector('.map__filters');
const mapSelects = mapFilters.querySelectorAll('.map__filter');
const featuresFilters = mapFilters.querySelector('.map__features');

const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');

const onFiltersChange = (offers) => {
  let currentOffers = offers.slice();

  if (typeFilter.value !== 'any') {
    currentOffers = currentOffers.filter(
      (item) => item.offer.type === typeFilter.value
    );
  }

  if (priceFilter.value !== 'any') {
    currentOffers = currentOffers.filter(
      (item) =>
      item.offer.price > PriceLevel[priceFilter.value.toUpperCase()].min &&
      item.offer.price <= PriceLevel[priceFilter.value.toUpperCase()].max
    );
  }

  if (roomsFilter.value !== 'any') {
    currentOffers = currentOffers.filter(
      (item) => +item.offer.rooms === +roomsFilter.value
    );
  }

  if (guestsFilter.value !== 'any') {
    currentOffers = currentOffers.filter(
      (item) => +item.offer.guests === +guestsFilter.value
    );
  }

  const checkedFeatures = mapFilters.querySelectorAll(
    '[type = "checkbox"]:checked'
  );

  if (checkedFeatures.length) {
    currentOffers = currentOffers.filter((item) => {
      if (!item.offer.features || !item.offer.features.length) {
        return false;
      }

      const checkedValues = Array.from(checkedFeatures).map(
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
  mapFilters.reset();
};

const deactivateFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapSelects.forEach((item) => {
    item.setAttribute('disabled', true);
  });
  featuresFilters.setAttribute('disabled', true);
};

const activateFilters = (offers) => {
  mapFilters.classList.remove('map__filters--disabled');
  mapSelects.forEach((item) => {
    item.removeAttribute('disabled');
  });
  featuresFilters.removeAttribute('disabled');
  mapFilters.addEventListener('change', () => onFiltersChange(offers));
  activateResetButtonRerender(offers);
  activateFormSubmitRerender(offers);
};

export {
  activateFilters,
  deactivateFilters,
  resetFilters
};
