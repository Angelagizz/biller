export const getLandlineAccount = async (telephone_number, token) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/landline/bill/info";
  const data = {
    telephone_number: telephone_number,
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

export const newBillLandline = async (
  token,
  responseData,
  payType,
  recurStatus,
  Period,
  date
) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/landline/bill/bankpayment";
  // console.log('data service', responseData)
  console.log("tanggal yg dikirim", date);
  console.log("period yg dikirim", Period);
  console.log("period", responseData[0]);
  const { No_Telephone, Bill, PIN, Admin, Late_Payment_Fee, Total } =
    responseData[0];
  const data = {
    data: {
      No_Telephone: `${No_Telephone}`,
      Period: [`${responseData[0].Period}`],

      Bill: `${Bill}`,
      Late_Payment_Fee: `${Late_Payment_Fee}`,
      Admin: `${Admin}`,
      Total: `${Total}`,
      PIN: PIN,
    },
    payment: {
      type: "Bank Transfer",
      bank_destination_id: "1",
    },
    recurringBilling: {
      status: recurStatus,
      period: `${Period}`,
      recurringDate: `${date}`,
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

export const uploadReceiptLandline = async (
  token,
  transaction_id,
  bill_id,
  landline_bill_details,
  file,
  bankId
) => {
  const url =
    "https://biller-app-api.herokuapp.com/api/biller/payment/bank-transfer/confirmation";
  const data = {
    billId: `${bill_id}`,
    transactionId: `${transaction_id}`,
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
