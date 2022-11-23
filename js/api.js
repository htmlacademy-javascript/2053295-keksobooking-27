import {
  GET_ADDRESS_DEFOLT,
  SET_ADDRESS_DEFOLT,
} from './constants.js';
import {
  createSuccessfullySentMessage,
  createErrorSentMessage,
  showPushMessage,
} from './messages.js';
import {
  resetData,
} from './form.js';

const getResourse = async (onSuccess) => {
  fetch(GET_ADDRESS_DEFOLT)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showPushMessage();
    });
};

const sendResource = (data) => {
  fetch(SET_ADDRESS_DEFOLT, {
    method: 'POST',
    type: 'multipart/form-data',
    body: data,
  })
    .then((response) => {
      if (response.ok) {
        createSuccessfullySentMessage();
        resetData();
      } else {
        createErrorSentMessage();
      }
    })
    .catch(() => {
      createErrorSentMessage();
    });
};

export {
  getResourse,
  sendResource,
};
