
import {
  getResourse,
} from './api.js';

import {
  initMap,
  renderSimilarAds,
} from './map.js';

getResourse('https://27.javascript.pages.academy/keksobooking/data');
initMap();
renderSimilarAds();

