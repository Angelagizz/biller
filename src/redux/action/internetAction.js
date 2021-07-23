export const setInternetOptions = (data) => {
    return {
      type: 'SET',
      payload: data
    }
  }

export const setInternetCust = (data) => {
  return {
    type: 'SETCUST',
    payload: data
  }
}

export const setDataBillInternet = (data) =>{
  return{
    type: 'SETDATABILL',
    payload: data
  }
}

export const setInternetReceipt = (data) => {
  return {
    type: 'SETINTERNETRECEIPT',
    payload: data
  }
}
