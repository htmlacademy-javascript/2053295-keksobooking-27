// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomIntegerNumber = (min, max) => {

  const lowerValue = Math.min(Math.abs(min), Math.abs(max));
  const greaterValue = Math.max(Math.abs(min), Math.abs(max));

  return !isNaN(min, max) && min !== 0 && max !== 0 && min !== max ?
    Math.floor(Math.random() * (greaterValue - lowerValue + 1)) + lowerValue : NaN;
};
// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFractionalNumber = (min, max, fract) => {

  const lowerValue = Math.min(Math.abs(min), Math.abs(max));
  const greaterValue = Math.max(Math.abs(min), Math.abs(max));

  return !isNaN(min, max) && min !== 0 && max !== 0 && min !== max ?
    ((Math.random() * (greaterValue - lowerValue + 1)) + lowerValue).toFixed(fract) : NaN;
};

getRandomIntegerNumber(1, 9);
getRandomFractionalNumber(1, 3, 2);
