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

import './avatar.js';
import './housing-photo.js';

makeInactive();
initMap();
getResourse(renderSimilarAds);
