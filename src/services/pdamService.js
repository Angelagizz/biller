export const getRegion = async (token) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/pdam/bill/region/all";
  try {
    const store = window.localStorage;
    const token = store.getItem("token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getPdamAccount = async (customerNumber, token) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/pdam/bill/customer/info";
  const data = {
    customerNumber: customerNumber,
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

export const newBillPdam = async (
  token,
  responseData,
  payType,
  recurStatus,
  periode,
  date
) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/pdam/bill/new";
  // console.log('data service', responseData)
  const {
    customerNumber,
    name,
    period,
    lastMonthStandMeter,
    thisMonthStandMeter,
    usage,
    bill,
    latePaymentFee,
    admin,
    total,
  } = responseData[0];
  const data = {
    "customerNumber": `${customerNumber}`,
    "name": `${name}`,
    "period": [`${period}`],
    "lastMonthStandMeter": `${lastMonthStandMeter}`,
    "thisMonthStandMeter": `${thisMonthStandMeter}`,
    "usage": `${usage}`,
    "bill": `${bill}`,
    "latePaymentFee": `${latePaymentFee}`,
    "admin": `${admin}`, 
    "total": `${total}`,
    "payment": {
      "type": "Bank Transfer",
      "bankDestinationId": "1",
    },
    "recurringBilling": {
      "status": true,
      "period": "Month",
      "createDate": "2021-07-20",
    },
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

export const uploadReceiptPdam = async (
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

