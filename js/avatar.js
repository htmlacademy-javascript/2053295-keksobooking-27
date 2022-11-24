import {
  DEFAULT_AVATAR,
  FILE_TYPES,
} from './constants.js';
import {
  showErrorFilePushMessage,
} from './messages.js';

const fileChooserElement = document.querySelector('#avatar');
const previewElement = document.querySelector('.ad-form-header__preview').querySelector('img');
const formElement = document.querySelector('.ad-form__field');

const onFormElementChange = () => {

  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewElement.src = URL.createObjectURL(file);
  } else {
    showErrorFilePushMessage();
  }
};
formElement.addEventListener('change', onFormElementChange);

const removeAvatar = () => {
  previewElement.src = DEFAULT_AVATAR;
};

export {
  removeAvatar,
};
