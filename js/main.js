import {
  getSimilarObjectsData,
} from './data.js';
import {
  renderSimilarCards,
} from './similar-items.js';
const arr = getSimilarObjectsData();
// console.log(arr.slice(0, 1));
// console.log(getSimilarObjectsData(slice(0, 1)));
console.log(getSimilarObjectsData().slice(0, 1));
renderSimilarCards(getSimilarObjectsData().slice(0, 1));
