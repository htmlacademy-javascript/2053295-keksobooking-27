const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#images');
const preview = document.querySelector('.ad-form__photo');
const uploadPhoto = document.querySelector('.ad-form__input');

uploadPhoto.addEventListener('change', () => {
console.log('obj');
console.log(preview);



  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  console.log(matches);
  if (matches) {
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.width = 70;
    preview.append(image);
  }
});

















// Housing photo
