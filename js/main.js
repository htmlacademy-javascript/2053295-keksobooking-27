// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Функция, возвращающая случайное целое число из переданного диапазона включительно.
let getRandomintegerNumber = (min, max) => {
  if (!isNaN(min, max) && min != 0 && max != 0 && min != max) {
    const lowerValue = Math.abs(Math.min(min, max));
    const greaterValue = Math.abs(Math.max(min, max));

    return Math.floor(Math.random() * (greaterValue - lowerValue + 1)) + lowerValue;
  }

  return NaN;
}
// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
let getRandomFractionalNumber = (min, max, fract) => {
  if (!isNaN(min, max) && min != 0 && max != 0 && min != max) {
    const lowerValue = Math.abs(Math.min(min, max));
    const greaterValue = Math.abs(Math.max(min, max));

    return ((Math.random() * (greaterValue - lowerValue + 1)) + lowerValue).toFixed(fract);
  }

  return NaN;
}

getRandomNumber(1, 9);
getRandomFractionalNumber(1, 3, 2);
