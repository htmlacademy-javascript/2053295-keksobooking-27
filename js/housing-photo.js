import {
  FILE_TYPES,
} from './constants.js';
import {
  showErrorFilePushMessage,
} from './messages.js';

const fileChooserElement = document.querySelector('#images');
const previewElement = document.querySelector('.ad-form__photo');
const uploadPhotoElement = document.querySelector('.ad-form__input');

const onUploadPhotoElementClick = () => {

  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const image = document.createElement('img');
    image.classList.add('ad-form__image');
    image.src = URL.createObjectURL(file);
    image.width = 70;
    previewElement.append(image);
  } else {
    showErrorFilePushMessage();
  }
};

uploadPhotoElement.addEventListener('change', onUploadPhotoElementClick);

const removePhoto = () => {
  const currentImages = previewElement.querySelectorAll('.ad-form__image');
  currentImages.forEach((e) => {
    e.remove();
  });
};

export {
  removePhoto,
};
