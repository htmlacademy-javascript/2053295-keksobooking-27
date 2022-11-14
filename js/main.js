
import {
  getResourse,
} from './api.js';
import {
  getGuestValue,
} from './form.js';
import {
  initMap,
  renderSimilarAds,
} from './map.js';

getGuestValue();
getResourse('https://27.javascript.pages.academy/keksobooking/data');
initMap();
renderSimilarAds();

