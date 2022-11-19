const getResourse = async (url) => {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} — ${response.statusText}`);
  }
  const receivedData = await response.json();

  return receivedData;
};

const sendResource = async (url, data) => {

  const response = await fetch(url, {
    method: 'POST',
    type: 'multipart/form-data',
    body: data,
  });
  if (!response.ok) {
    throw new Error(`${response.status} — ${response.statusText}`);
  }
  return await response.json();
};

export {
  getResourse,
  sendResource,
};
