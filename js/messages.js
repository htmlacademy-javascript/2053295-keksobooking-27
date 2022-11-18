const templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
const templateErrorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const createSuccessfullySentMessage = () => {
  const successMessage = templateSuccessMessage.cloneNode(true);
  body.insertAdjacentElement('beforeend', successMessage);
  successMessage.addEventListener('click', () => {
    successMessage.remove();
  }, { once: true });
};

const createErrorSentMessage = () => {
  const errorMessage = templateErrorMessage.cloneNode(true);
  body.insertAdjacentElement('beforeend', errorMessage);
  const errorButton = errorMessage.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    errorMessage.remove();
  }, { once: true });
};


export {
  createSuccessfullySentMessage,
  createErrorSentMessage,
};
