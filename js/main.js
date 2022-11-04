import {
  getSimilarObjectsData,
} from './data.js';
import {
  renderSimilarCards,
} from './similar-items.js';

renderSimilarCards(getSimilarObjectsData().slice(0, 1));
