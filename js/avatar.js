import {
  PREVIEW_DEFOLT,
} from './constants.js';

const FILE_TYPES = [
  'jpg',
  'jpeg',
  'png',
];

const fileChooserElement = document.querySelector('#avatar');
const previewElement = document.querySelector('.ad-form-header__preview').querySelector('img');
const formElement = document.querySelector('.ad-form__field');

const onFormElementChange = () => {

  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewElement.src = URL.createObjectURL(file);
  }
};
formElement.addEventListener('change', onFormElementChange);

const avatarRemove = () => {
  previewElement.src = PREVIEW_DEFOLT;
};

export {
  avatarRemove,
};
