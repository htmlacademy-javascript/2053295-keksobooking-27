const FILE_TYPES = [
  'jpg',
  'jpeg',
  'png',
];

const fileChooser = document.querySelector('#images');
const preview = document.querySelector('.ad-form__photo');
const uploadPhoto = document.querySelector('.ad-form__input');

const createHousingPhoto = () => {

  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const image = document.createElement('img');
    image.classList.add('ad-form__image');
    image.src = URL.createObjectURL(file);
    image.width = 70;
    preview.append(image);
  }
};

uploadPhoto.addEventListener('change', createHousingPhoto);

const photoRemove = () => {
  const currentImages = preview.querySelectorAll('.ad-form__image');
  currentImages.forEach((e) => {
    e.remove();
  });
};

export {
  photoRemove,
};
