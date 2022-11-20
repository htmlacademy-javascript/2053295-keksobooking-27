import {
  createSuccessfullySentMessage,
  createErrorSentMessage,
} from './messages.js';
import {
  resetData,
} from './form.js';

const getResourse = async (onSuccess) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      // alert('Ошибка загрузки');
    });
};

const sendResource = (data) => {
  fetch('https://27.javascript.pages.academy/keksobooking', {
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


// fetch('https://27.javascript.pages.academy/keksobooking', {
//       method: 'POST',
//       type: 'multipart/form-data',
//       body: data,
//     })
//     .then((response) => {
//       if (response.ok) {
//         createSuccessfullySentMessage();
//         console.log('ok');
//       } else {
//           createErrorSentMessage();
//           console.log('!ok');
//       }
//     })
//     .catch(() => {
//       createErrorSentMessage();
//       console.log('!ok!');
//     })
