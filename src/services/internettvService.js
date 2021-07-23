export const getInternetAccount = async (customer_number, token) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/internet_TV/information";
  const data = {
    customer_number: customer_number,
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

export const getInternetOptions = async (token) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/internet_TV/options/3";
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

export const newBillInternetTv = async (
  token,
  responseData,
  payType,
  recurStatus,
  period,
  date
) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/internet_TV/bill";
  // console.log('data service', responseData)
  console.log("tanggal yg dikirim", date);
  console.log("period yg dikirim", period);
  const {
    name,
    address,
    admin_fee,
    pin,
    bill,
    customer_number,
    late_payment,
    payment_period,
    provider,
    total,
  } = responseData[0];
  const data = {
    data: {
      name: `${name}`,
      customer_number: `${customer_number}`,
      provider: `${provider}`,
      address: `${address}`,
      payment_period: `${payment_period}`,

      bill: `${bill}`,
      late_payment: `${late_payment}`,
      admin_fee: `${admin_fee}`,
      total: `${total}`,
    },
    payment: {
      type: "Bank Transfer",
      bank_destination: "1",
    },
    recurringBilling: {
      status: recurStatus,
      period: `${period}`,
      date: `${date}`,
    },
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

export const uploadReceiptInternet = async (
  token,
  transactionId,
  billId,
  file,
  bankId
) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/payment/bank-transfer/confirmation";
  const data = {
    billId: `${billId}`,
    transactionId: `${transactionId}`,
    bankDestinationId: "1",
    receipt: `${file}`,
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
