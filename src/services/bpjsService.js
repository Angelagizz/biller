export const bpjsCustomer = async (customerNumber, token) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/bpjs/bill/customer/info";
  const data = {
    customerNumber: customerNumber,
  };
  try {
    const store = window.localStorage;
    const token = store.getItem("token");
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
export const newBillBpjs = async (
  token,
  responseData,
  payType,
  recurStatus,
  periode,
  date
) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/bpjs/bill/new/bill";
  // console.log('data service', responseData)
  const {
    noVa,
    fullName,
    branch,
    familyMember,
    period,
    countMonth,
    bill,
    adminFee,
    total,
  } = responseData[0];
  console.log("service", responseData[0]);
  const data = {
    "vaNumber": `${noVa}`,
    "fullName": `${fullName}`,
    "branch": `${branch}`,
    "familyMember": `${familyMember}`,
    "period": `${period}`,
    "countMonth": `${countMonth}`,
    "bill": `${bill}`,
    "adminFee": `${adminFee}`, 
    "total": `${total}`,
    "payment": {
      "type": "Bank Transfer",
      "bankDestinationId": "1",
    },
    "recurringBilling": {
      "status": true,
      "period": "Month",
      "createDate": "2021-08-08",
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
export const uploadReceiptBpjs = async (
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
