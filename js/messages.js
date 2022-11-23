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

  const onEscapeRemoveSuccessMessage = () => {
    if (isEscape) {
      successMessage.remove();
    }
    returnToDefaultLocation();
  };

  const onClickRemoveSuccessMessage = () => {
    successMessage.remove();
    returnToDefaultLocation();
  };

  successMessage.addEventListener('click', onClickRemoveSuccessMessage);
  document.addEventListener('keydown', onEscapeRemoveSuccessMessage);
};

const createErrorSentMessage = () => {
  const errorMessage = templateErrorMessageElement.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  bodyElement.insertAdjacentElement('beforeend', errorMessage);

  const onClickRemoveErrorMessage = () => {
    errorMessage.remove();
    errorButton.removeEventListener('click', onClickRemoveErrorMessage);

  };
  const onClickEscapeErrorMessage = () => {
    if (isEscape) {
      errorMessage.remove();
      errorButton.removeEventListener('click', onClickRemoveErrorMessage);
      document.removeEventListener('keydown', onClickEscapeErrorMessage);
    }
  };
  errorButton.addEventListener('click', onClickRemoveErrorMessage);
  document.addEventListener('keydown', onClickEscapeErrorMessage);
};

const showPushMessage = () => {
  const pushMessage = document.createElement('div');
  pushMessage.classList.add('push-message');
  pushMessage.textContent = 'Ошибка загрузки';
  bodyElement.insertAdjacentElement('afterbegin', pushMessage);
  setTimeout(() => {
    pushMessage.remove();
  }, 3000);

};

export {
  createSuccessfullySentMessage,
  createErrorSentMessage,
  showPushMessage,
};
