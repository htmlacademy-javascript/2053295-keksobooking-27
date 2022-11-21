import {
  returnToDefaultLocation,
} from './map.js';

const templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
const templateErrorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const createSuccessfullySentMessage = () => {
  const successMessage = templateSuccessMessage.cloneNode(true);
  body.insertAdjacentElement('beforeend', successMessage);

  const onEscapeRemoveSuccessMessage = (e) => {
    if (e.key === 'Escape') {
      successMessage.remove();
    }
    successMessage.removeEventListener('click', );
    document.removeEventListener('keydown', onEscapeRemoveSuccessMessage);
    returnToDefaultLocation();
  };

  const onClickRemoveSuccessMessage = () => {
    successMessage.remove();
    successMessage.removeEventListener('click', onClickRemoveSuccessMessage);
    document.removeEventListener('keydown', onEscapeRemoveSuccessMessage);
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
  const onClickEscapeErrorMessage = (e) => {
    if (e.key === 'Escape') {
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
