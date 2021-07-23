export const login = async (email, password) => {
  const url = "https://biller-app-api.herokuapp.com/api/biller/login";
  const data = {
    email,
    password,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
export const register = async (first_name, last_name, email, password, pin) => {
  const url = "https://biller-app-api.herokuapp.com/api/biller/signup";
  const data = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    pin: pin,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getUserDetail = async (token) => {
  const url = "https://biller-app-api.herokuapp.com/api/biller/user/info";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`,
      }
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getUserPaymentCards = async (token) => {
  const url = "https://biller-app-api.herokuapp.com/api/biller/payment/card/list";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`,
      }
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const AddNewPaymentCard = async (token, cardNumber, cardHolderName, expireDate, cvv, type) => {
  const url = "https://biller-app-api.herokuapp.com/api/biller/payment/new/card";
  const data = {
    cardNumber,
    cardHolderName,
    expireDate,
    cvv,
    type,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const updateAccount = async (
    first_name, last_name, email, password, new_password, phone_number, pin, new_pin, token) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/user/update";
  const data = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    new_password: new_password,
    phone_number: phone_number,
    pin: pin,
    new_pin: new_pin
  };
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

