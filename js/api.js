const getResourse = async (url) => {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
  }
  const receivedData = await response.json();

  return receivedData;
};

export {
  getResourse,
};
