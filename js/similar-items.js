import {
  HouseType
} from './constants.js';

const templateFragmentElement = document.querySelector('#card').content.querySelector('.popup');
const templatePhotosElement = document.querySelector('#housing-photos').content.querySelector('.popup__photo');

const renderSimilarCard = (item) => {

  const cardElement = templateFragmentElement.cloneNode(true);
  const featuresContainerElement = cardElement.querySelector('.popup__features');
  const featuresListElement = featuresContainerElement.querySelectorAll('.popup__feature');
  const photoContainerElement = cardElement.querySelector('.popup__photos');
  const avatarElement = cardElement.querySelector('.popup__avatar');
  const titleElement = cardElement.querySelector('.popup__title');
  const addressElement = cardElement.querySelector('.popup__text--address');
  const priceElement = cardElement.querySelector('.popup__text--price');
  const typeElement = cardElement.querySelector('.popup__type');
  const capacityElement = cardElement.querySelector('.popup__text--capacity');
  const timeElement = cardElement.querySelector('.popup__text--time');
  const descriptionElement = cardElement.querySelector('.popup__description');

  const { avatar, } = item.author;
  const { lat, lng, } = item.location;
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
    avatarElement.remove();
  } else {
    avatarElement.src = avatar;
  }

  if (!title) {
    titleElement.remove();
  } else {
    titleElement.textContent = title;
  }

  if (!(lat || lng)) {
    addressElement.remove();
  } else {
    addressElement.textContent = address;
  }

  if (!price) {
    priceElement.remove();
  } else {
    priceElement.textContent = `${price} ₽/ночь`;
  }

  if (!type) {
    typeElement.remove();
  } else {
    typeElement.textContent = HouseType[type];
  }

  if (!(rooms || guests)) {
    capacityElement.remove();
  } else {
    capacityElement.textContent = `${rooms} ${roomsWord} для ${guests} ${guestsWord}`;
  }

  if (!(checkin && checkout)) {
    timeElement.textContent = 'Заезд после --:-- , выезд до --:--';
  } else if (!checkin) {
    timeElement.textContent = `Выезд до ${checkout}`;
  } else if (!checkout) {
    timeElement.textContent = `Заезд после ${checkin}`;
  } else {
    timeElement.textContent = `Заезд после ${checkin} , выезд до ${checkout}`;
  }

  if (!description) {
    descriptionElement.remove();
  } else {
    descriptionElement.textContent = description;
  }

  if (!(features && features.length)) {
    featuresContainerElement.remove();
  } else {
    featuresListElement.forEach((featuresItem) => {
      const receivedFeatures = (featuresItems) =>
        featuresItem.classList.contains(`popup__feature--${featuresItems}`);
      if (!features.some(receivedFeatures)) {
        featuresItem.remove();
      }
    });
  }

  if (!(photos && photos.length)) {
    photoContainerElement.remove();
  } else {
    photos.forEach((photo) => {
      if (photo) {
        const photoItem = templatePhotosElement.cloneNode(true);
        photoItem.src = photo;
        photoContainerElement.appendChild(photoItem);
      }
    });
  }
  return cardElement;
};

export {
  renderSimilarCard,
};
