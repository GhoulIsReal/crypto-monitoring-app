const baseURL = process.env.VUE_APP_API;
const apiKEY = process.env.CRYPTO_API_KEY;

export const getPrice = (cryptoName) => {
  return fetch(`${baseURL}/price?fsym=${cryptoName}&tsyms=USD`, {
    headers: { authorization: `Apikey ${apiKEY}` },
  })
    .then((res) => res.json())
    .catch(() => console.log("error"));
};

export const getAllCoins = () => {
  return fetch(`${baseURL}/all/coinlist?summary=true`, {
    headers: { authorization: `Apikey ${apiKEY}` },
  })
    .then((res) => res.json())
    .catch(() => console.log("error"));
};

export const getPriceHistory = (cryptoName) => {
  return fetch(`${baseURL}/v2/histohour?fsym=${cryptoName}&tsym=USD&limit=10`, {
    headers: { authorization: `Apikey ${apiKEY}` },
  })
    .then((res) => res.json())
    .catch(() => console.log("error"));
};
