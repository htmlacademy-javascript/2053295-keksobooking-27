import {
  HouseType
} from './constants.js';

const renderSimilarCards = (cards) => {
  const fragment = document.createDocumentFragment();
  const mapCanvas = document.querySelector('#map-canvas');

  const templateFragment = document.querySelector('#card').content.querySelector('.popup');
    const templatePhotos = document.querySelector('#housing-photos').content.querySelector('.popup__photo');

  cards.forEach((item) => {
    const templateFragment = document.querySelector('#card').content.querySelector('.popup');
    const cardItem = templateFragment.cloneNode(true);
    // const featuresContainer = cardItem.querySelector('.popup__features');
    const featuresList = cardItem.querySelector('.popup__features').querySelectorAll('.popup__feature');
    const photoContainer = cardItem.querySelector('.popup__photos');
    const cardItemAvatar = cardItem.querySelector('.popup__avatar');
    const cardItemTitle = cardItem.querySelector('.popup__title');
    const cardItemAddress = cardItem.querySelector('.popup__text--address');
    const cardItemPrice = cardItem.querySelector('.popup__text--price');
    const cardItemType = cardItem.querySelector('.popup__type');
    const cardItemCapacity = cardItem.querySelector('.popup__text--capacity');
    const cardItemTime = cardItem.querySelector('.popup__text--time');
    const cardItemDescription = cardItem.querySelector('.popup__description');

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
      cardItemAvatar.remove();
    } else {
      cardItemAvatar.src = avatar;
    }

    if (!title) {
      cardItemTitle.remove();
    } else {
      cardItemTitle.textContent = title;
    }

    if (!lat || !lng) {
      cardItemAddress.remove();
    } else {
      cardItemAddress.textContent = address;
    }

    if (!price) {
      cardItemPrice.remove();
    } else {
      cardItemPrice.textContent = `${price} ₽/ночь`;
    }

    if (!type) {
      cardItemType.remove();
    } else {
      cardItemType.textContent = HouseType[type];
    }

    if (!rooms || !guests) {
      cardItemCapacity.remove();
    } else {
      cardItemCapacity.textContent = `${rooms} ${roomsWord} для ${guests} ${guestsWord}`;
    }

    if (!checkin && !checkout) {
      cardItemTime.textContent = 'Заезд после --:-- , выезд до --:--';
    } else if (!checkin) {
      cardItemTime.textContent = `Выезд до ${checkout}`;
    } else if (!checkout) {
      cardItemTime.textContent = `Заезд после ${checkin}`;
    } else {
      cardItemTime.textContent = `Заезд после ${checkin} , выезд до ${checkout}`;
    }

    if (!description) {
      cardItemDescription.remove();
    } else {
      cardItemDescription.textContent = description;
    }

    featuresList.forEach((featuresItem) => {
      const receivedFeatures = (featuresItems) =>
        featuresItem.classList.contains(`popup__feature--${featuresItems}`);
      if (!features.some(receivedFeatures)) {
        featuresItem.remove();
      }
    });

    photos.forEach((photo) => {
      const templatePhotos = document.querySelector('#housing-photos').content.querySelector('.popup__photo');
      if (photo) {
        const photoItem = templatePhotos.cloneNode(true);
        photoItem.src = photo;
        photoContainer.appendChild(photoItem);
      }
    });
    fragment.appendChild(cardItem);
  });

  mapCanvas.appendChild(fragment);
};

export {
  renderSimilarCards
};
