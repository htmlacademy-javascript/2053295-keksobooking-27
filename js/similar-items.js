import {
  offerList,
  createAuthor,
} from './data.js';


const renderSimilarCards = () => {

  const fragment = document.createDocumentFragment(); // Фрагмент
  const templateFragment = document.querySelector('#card').content; // Шаблон

  const getTitle = () => { // Заголовок
    const title = templateFragment.querySelector('.popup__title');
    title.textContent = offerList.title;
    if (title.textContent) {
      fragment.appendChild(title);
    }
  };

  const determineCoordinates = () => { // Координаты
    const address = templateFragment.querySelector('.popup__text--address');
    address.textContent = offerList.address;
    if (address.textContent) {
      fragment.appendChild(address);
    }
  };

  const selectPrice = () => { // Цена за ночь
    const price = templateFragment.querySelector('.popup__text--price');
    price.textContent = `${offerList.price } ₽/ночь`;
    if (price.textContent) {
      fragment.appendChild(price);
    }
  };

  const selectHousingType = () => { //Тип жилья
    const type = offerList.type;
    if (type) {
      const housingType = document.createElement('h4');
      housingType.classList.add('popup__type');
      housingType.textContent = type;
      const HOUSE_TYPE = {
        palace: 'Дворец',
        flat: 'Квартира',
        house: 'Дом',
        bungalow: 'Бунгало',
        hotel: 'Отель',
      };
      const convertHouseType = () => {
        const russianTypeValue = HOUSE_TYPE[type];
        housingType.textContent = russianTypeValue;
        fragment.appendChild(housingType);
      };
      convertHouseType();
    }
  };

  const selectNumberRooms = () => { // Количество комнат и гостей
    const capacity = templateFragment.querySelector('.popup__text--capacity');
    const numberRooms = offerList.rooms;
    const numberGuests = offerList.guests;
    if (numberRooms && numberGuests) {
      let roomsWord;
      let guestsWord;
      if (numberRooms === 1) {
        roomsWord = 'комната';
      } else if (numberRooms >= 5) {
        roomsWord = 'комнат';
      } else {
        roomsWord = 'комнаты';
      }
      if (numberGuests === 1) {
        guestsWord = 'гостя';
      } else {
        guestsWord = 'гостей';
      }
      capacity.textContent = `${numberRooms } ${ roomsWord } для ${ numberGuests } ${ guestsWord}`;
      fragment.appendChild(capacity);
    }
  };

  const selectTimeStay = () => { // Время заезда и выезда
    const time = templateFragment.querySelector('.popup__text--time');
    const checkin = offerList.checkin;
    const checkout = offerList.checkout;
    if (!checkin && !checkout) {
      time.textContent = 'Заезд после --:-- , выезд до --:--';
    } else if (!checkout) {
      time.textContent = `Заезд после ${ checkin }`;
    } else if (!checkin) {
      time.textContent = `Выезд до ${ checkout}`;
    } else {
      time.textContent = `Заезд после ${ checkin } , выезд до ${ checkout}`;
    }
    fragment.appendChild(time);
  };

  const selectFeatures = (features) => { // Удобства
    if (!features.length) {
      return;
    }
    const featuresList = document.createElement('ul');
    featuresList.classList.add('popup__features');
    features.forEach((feature) => {
      const featuresListItem = document.createElement('li');
      featuresListItem.classList.add('popup__feature', `popup__feature--${ feature}`);
      featuresList.appendChild(featuresListItem);
    });
    fragment.appendChild(featuresList);
  };

  const addDescription = () => { // Описание
    const description = templateFragment.querySelector('.popup__description');
    description.textContent = offerList.description;
    if (description.textContent) {
      fragment.appendChild(description);
    }
  };

  const addPhotos = (photos) => { // Фотографии
    if (!photos.length) {
      return;
    }
    const photosContainer = document.createElement('div');
    photosContainer.classList.add('popup__photos');
    photos.forEach((photo) => {
      const photoItem = document.createElement('img');
      photoItem.classList.add('popup__photo');
      photoItem.alt = 'Фотография жилья';
      photoItem.src = photo;
      photosContainer.appendChild(photoItem);
    });
    fragment.appendChild(photosContainer);
  };

  const getAvatar = () => {
    const avatar = document.querySelector('.ad-form-header__preview>img');
    avatar.src = createAuthor().avatar;
  };

  getTitle();
  determineCoordinates();
  selectPrice();
  selectHousingType();
  selectNumberRooms();
  selectTimeStay();
  selectFeatures(offerList.features);
  addDescription();
  addPhotos(offerList.photos);
  getAvatar();

  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.appendChild(fragment);
};

export {
renderSimilarCards
};
