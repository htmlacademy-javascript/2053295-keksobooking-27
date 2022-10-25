import {
  // similarObjects,
  getSimilarObjectsData,
} from './data.js';
import {
  renderSimilarCards,
} from './similar-items.js';


renderSimilarCards(getSimilarObjectsData(location.lat));
