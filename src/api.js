const baseURL = process.env.VUE_APP_API;
const apiKEY = process.env.CRYPTO_API_KEY;

export const getPrice = async (cryptoName) => {
  try {
    const response = await fetch(
      `${baseURL}/price?fsym=${cryptoName}&tsyms=USD`,
      {
        headers: { authorization: `Apikey ${apiKEY}` },
      }
    );
    return await response.json();
  } catch (err) {
    alert(err);
  }
};

export const getAllCoins = async () => {
  try {
    const response = await fetch(`${baseURL}/all/coinlist?summary=true`, {
      headers: { authorization: `Apikey ${apiKEY}` },
    });
    return await response.json();
  } catch (err) {
    alert(err);
  }
};

// export const getPriceHistory = (cryptoName) => {
//   return fetch(`${baseURL}/v2/histohour?fsym=${cryptoName}&tsym=USD&limit=10`, {
//     headers: { authorization: `Apikey ${apiKEY}` },
//   })
//     .then((res) => res.json())
//     .catch(() => console.log("error"));
// };
