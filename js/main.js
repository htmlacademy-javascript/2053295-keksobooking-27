// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
function getRandomFractionalNumber(min, max, fract) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return +((Math.floor(Math.random() * (max - min + 1)) + min) + Math.random()).toFixed(fract);
}

getRandomNumber(1, 9);
getRandomFractionalNumber(1, 3, 2);
