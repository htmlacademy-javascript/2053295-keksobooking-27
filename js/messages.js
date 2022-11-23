import {
  returnToDefaultLocation,
} from './map.js';
import {
  isEscape,
} from './util.js';

const templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
const templateErrorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const createSuccessfullySentMessage = () => {
  const successMessage = templateSuccessMessage.cloneNode(true);
  body.insertAdjacentElement('beforeend', successMessage);

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
  const errorMessage = templateErrorMessage.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  body.insertAdjacentElement('beforeend', errorMessage);

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
  body.insertAdjacentElement('afterbegin', pushMessage);
  setTimeout(() => {
    pushMessage.remove();
  }, 3000);

};

export {
  createSuccessfullySentMessage,
  createErrorSentMessage,
  showPushMessage,
};
