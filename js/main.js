import {
  getResourse,
} from './api.js';

import {
  makeInactive,
} from './form.js';

import {
  initMap,
  renderSimilarAds,
} from './map.js';

makeInactive();
initMap();
getResourse('https://27.javascript.pages.academy/keksobooking/data').then((data) => renderSimilarAds(data));
