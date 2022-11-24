import {
  returnToDefaultLocation,
} from './map.js';

import {
  isEscape,
} from './util.js';

const templateSuccessMessageElement = document.querySelector('#success').content.querySelector('.success');
const templateErrorMessageElement = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.querySelector('body');

const createSuccessfullySentMessage = () => {
  const successMessage = templateSuccessMessageElement.cloneNode(true);
  bodyElement.insertAdjacentElement('beforeend', successMessage);

  const onSuccessMessageKeydown = () => {
    if (isEscape) {
      successMessage.remove();
    }
    returnToDefaultLocation();
  };

  const onSuccessMessageClick = () => {
    successMessage.remove();
    returnToDefaultLocation();
  };

  successMessage.addEventListener('click', onSuccessMessageClick);
  document.addEventListener('keydown', onSuccessMessageKeydown);
};

const createErrorSentMessage = () => {
  const errorMessage = templateErrorMessageElement.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  bodyElement.insertAdjacentElement('beforeend', errorMessage);

  const onErrorButtonClick = () => {
    errorMessage.remove();
  };
  const onErrorMessageKeydown = () => {
    if (isEscape) {
      errorMessage.remove();
    }
  };
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorMessageKeydown);
};

const showPushMessage = () => {
  const pushMessage = document.createElement('div');
  pushMessage.classList.add('push-message');
  pushMessage.textContent = 'Ошибка загрузки \n Попробуйте ещё';
  bodyElement.insertAdjacentElement('afterbegin', pushMessage);
  setTimeout(() => {
    pushMessage.remove();
  }, 3000);
};

const showErrorFilePushMessage = () => {
  const pushMessage = document.createElement('div');
  pushMessage.classList.add('push-message-error-file');
  pushMessage.textContent = 'Выбран не подходящий файл \n Выберите файл jpg, jpeg или png';
  bodyElement.insertAdjacentElement('afterbegin', pushMessage);
  setTimeout(() => {
    pushMessage.remove();
  }, 3000);
};

export {
  createSuccessfullySentMessage,
  createErrorSentMessage,
  showPushMessage,
  showErrorFilePushMessage,
};
