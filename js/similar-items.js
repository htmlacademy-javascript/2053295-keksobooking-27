import {
  HOUSE_TYPE
} from './constants.js';

const renderSimilarCards = (cards) => {
  const fragment = document.createDocumentFragment();
  const templateFragment = document.querySelector('#card').content.querySelector('.popup');
  const mapCanvas = document.querySelector('#map-canvas');
  const cardItem = templateFragment.cloneNode(true);
  let featuresList = cardItem.querySelector('.popup__features').querySelectorAll('.popup__feature');
  const photoContainer = cardItem.querySelector('.popup__photos');

  cards.forEach((item) => {
    const { avatar, } = item.author;
    const { address, checkin, checkout, description, features, guests, photos, price, rooms, title, type, } = item.offer;
    let roomsWord;
    let guestsWord;
    if (rooms === 1) {
      roomsWord = 'комната';
    } else if (rooms >= 5) {
      roomsWord = 'комнат';
    } else {
      roomsWord = 'комнаты';
    }
    if (guests === 1) {
      guestsWord = 'гостя';
    } else {
      guestsWord = 'гостей';
    }

    if (!avatar) {
      avatar.remove();
    } else {
      cardItem.querySelector('.popup__avatar').src = avatar;
    }

    if (!title) {
      title.remove();
    } else {
      cardItem.querySelector('.popup__title').textContent = title;
    }

    if (!address) {
      address.remove();
    } else {
      cardItem.querySelector('.popup__text--address').textContent = address;
    }

    if (!price) {
      price.remove();
    } else {
      cardItem.querySelector('.popup__text--price').textContent = price;
    }

    if (!type) {
      type.remove();
    } else {
      cardItem.querySelector('.popup__type').textContent = HOUSE_TYPE[type];
    }

    if (!rooms || !guests) {
      price.remove();
    } else {
      cardItem.querySelector('.popup__text--capacity').textContent = `${rooms } ${ roomsWord } для ${ guests } ${ guestsWord}`;
    }

    if (!checkin && !checkout) {
      cardItem.querySelector('.popup__text--time').textContent = 'Заезд после --:-- , выезд до --:--';
    } else if (!checkin) {
      cardItem.querySelector('.popup__text--time').textContent = `Выезд до ${ checkout}`;
    } else if (!checkout) {
      cardItem.querySelector('.popup__text--time').textContent = `Заезд после ${ checkin }`;
    } else {
      cardItem.querySelector('.popup__text--time').textContent = `Заезд после ${ checkin } , выезд до ${ checkout}`;
    }

    if (!description) {
      description.remove();
    } else {
      cardItem.querySelector('.popup__description').textContent = description;
    }

    for (let i = 0; i < featuresList.length; i++) {
      for (let j = 0; j < features.length; j++) {
        if (featuresList[i].classList.contains(`popup__feature--${features[j]}`)) {
          featuresList = document.createElement('li');
          featuresList.classList.add('popup__feature', `popup__feature--${features[j]}`);
          break;
        } else {
          featuresList[i].remove();
        }
      }
    }

    if (!photos) {
      photoContainer.remove();
    } else {
      if (photos.length > 1) {
        photoContainer.querySelector('img').remove();
        for (let i = 0; i < photos.length; i++) {
          const photoItem = document.createElement('img');
          photoItem.classList.add('popup__photo');
          photoItem.src = photos[i];
          photoItem.width = '45';
          photoItem.height = '40';
          photoItem.alt = `Фотография жилья  ${i + 1}`;
          photoContainer.appendChild(photoItem);
        }
      } else {
        cardItem.querySelector('.popup__photo').src = photos[0];
      }
    }
    fragment.appendChild(cardItem);
  });
  mapCanvas.appendChild(fragment);
};

export {
  renderSimilarCards
};
