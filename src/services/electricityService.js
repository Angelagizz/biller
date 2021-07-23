import { CompareArrowsOutlined } from "@material-ui/icons";

export const getElectricityOption = async (token) => {
    const url = "https://biller-app-api.herokuapp.com/api/biller/electricity/bill/options/1";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
      });
      return response.json();
    } catch (error) {
      throw error;
    }
};

export const getTokenPriceList = async (token) => {
    const url = "https://biller-app-api.herokuapp.com/api/biller/electricity/bill/token/blank";
    const data = {
        option_id:1
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

export const getTokenAccInfo = async (token, noMeter, harga) => {
    const url = "https://biller-app-api.herokuapp.com/api/biller/electricity/bill/token/info";
    const data = {
        nomor_meter : `${noMeter}`,
        price : `${harga}`,
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

export const getTagihanAccInfo = async (token, idpel ) => {
  const url = 'https://biller-app-api.herokuapp.com/api/biller/electricity/bill/tagihan/info'
  const data ={
        idpel:`${idpel}`
  }
  try {
    const response = await fetch(url,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(data),
    })
    return response.json();
  } catch (error){
    throw error
  }
}

export const createTokenBill =  async (token, dataToken, status, period, day, payType) =>{
  console.log('status yg dikirim', status)
  const { No_Meter, IDPEL, Name, Tarif_Daya, Token, PPJ, Admin, Total, PIN } = dataToken[0]
  const url = 'https://biller-app-api.herokuapp.com/api/biller/electricity/bill/token/bankpayment'
  const data ={
              "data": {
                "No_Meter": `${No_Meter}`,
                "IDPEL": `${IDPEL}`,
                "Name": `${Name}`,
                "Tarif_Daya": `${Tarif_Daya}`,
                "Token": Token,
                "PPJ": PPJ,
                "Admin": Admin,
                "Total": Total,
                "PIN": `${PIN}`
            },
            "payment" : {
                "type": "Bank Transfer",
                "bank_destination_id": "1"
            },
              "recurringBilling": {
                "status": status,
                "period": `${period}`,
                "dayOfWeek": ""
            }
  }
  try {
    const response = await fetch(url,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(data),
    })
    return response.json();
  } catch (error){
    throw error
  }
}


export const createTagihanBill =  async (token, dataTagihan, status, period, day, payType) =>{
  const { IDPEL, Name, Tarif_Daya, Bulan_Tahun, Stand_Meter, Bill,Late_Payment_Fee, Admin, Total, PIN } = dataTagihan[0]
  console.log('day di service'.day)
  // console.log('bulan_tahun yg di kirim', Bulan_Tahun)
  // const baru = Bulan_Tahun.split(',')
  // console.log('bulan tahun edit', baru )
  const url = 'https://biller-app-api.herokuapp.com/api/biller/electricity/bill/tagihan/bankpayment'
  const data ={
            "data": {
              "IDPEL": `${IDPEL}`,
              "Name": `${Name}`,
              "Tarif_Daya": `${Tarif_Daya}`,
              "Bulan_Tahun":  `${Bulan_Tahun}`, //Bulan_Tahun.split(',')
              "Stand_Meter": `${Stand_Meter}`,
              "Bill": Bill,
              "Admin": Admin,
              "Late_Payment_Fee": Late_Payment_Fee,
              "Total": Total,
              "PIN": `${PIN}`
          },
          "payment" : {
              "type": "Bank Transfer",
              "bank_destination_id": "1"
          },
            "recurringBilling": {
              "status": false,
              "period": "Month",
              "dayOfWeek": "",
              "recurringDate": ""
          }
  }
  try {
    const response = await fetch(url,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(data),
    })
    return response.json();
  } catch (error){
    throw error
  }
}

export const uploadReceiptElectricity= async (token, transactionId, billId, file,bankId) => {
  const url = "https://biller-app-api.herokuapp.com/api/biller/payment/bank-transfer/confirmation";
  const data = {
    billId : `${billId}`,
    transactionId : `${transactionId}`,
    bankDestinationId : '1',
    receipt : `${file}`
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
