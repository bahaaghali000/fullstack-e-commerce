export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};

export const convertToCurrency = (price, currency) => {
  let formater = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  });

  return formater.format(price);
};
