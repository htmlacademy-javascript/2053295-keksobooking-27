const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#avatar');
const preview = document.querySelector('.ad-form-header__preview').querySelector('img');
const adFormField = document.querySelector('.ad-form__field');

adFormField.addEventListener('change', () => {

  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});

const avatarRemove = () => {
  preview.src = 'img/muffin-grey.svg';
};

export {
  avatarRemove,
};
