// Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomIntegerNumber = (min, max) => {
  const lowerValue = Math.min(Math.abs(min), Math.abs(max));
  const greaterValue = Math.max(Math.abs(min), Math.abs(max));
  return !isNaN(min, max) && max !== 0 && min !== max ?
    Math.floor(Math.random() * (greaterValue - lowerValue + 1)) + lowerValue : NaN;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFractionalNumber = (min, max, fract) => {
  const lowerValue = Math.min(Math.abs(min), Math.abs(max));
  const greaterValue = Math.max(Math.abs(min), Math.abs(max));
  return !isNaN(min, max) && max !== 0 && min !== max ?
    ((Math.random() * (greaterValue - lowerValue)) + lowerValue).toFixed(fract) : NaN;
};

export {
  getRandomIntegerNumber,
  getRandomFractionalNumber,
};
