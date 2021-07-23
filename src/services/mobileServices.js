export const getMobileOptions = async (token) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/mobile/bill/options";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getPulsaPriceList = async (token) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/mobile/bill/price-list";
  const data = {
    optionPriceId: 9,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getInternetPriceList = async (token) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/mobile/bill/price-list";
  const data = {
    optionPriceId: 17,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getProviderInfo = async (token) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/mobile/bill/providers";
  const data = {
    id: 1,
  };
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
