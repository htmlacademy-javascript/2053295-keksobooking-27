import {
  getSimilarObjectsData,
} from './data.js';
import {
  renderSimilarCards,
} from './similar-items.js';
import {
  getResourse,
} from './map.js';
import {
  getGuestValue,
} from './form.js';

renderSimilarCards(getSimilarObjectsData().slice(0, 1));
getGuestValue();
getResourse('https://27.javascript.pages.academy/keksobooking/data');
