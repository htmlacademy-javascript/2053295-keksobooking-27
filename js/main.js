import {
  getSimilarObjectsData,
} from './data.js';
import {
  renderSimilarCards,
} from './similar-items.js';
import {
  makeInactive,
  makeActive,
} from './form.js';

renderSimilarCards(getSimilarObjectsData().slice(0, 1));
makeInactive();
makeActive();
