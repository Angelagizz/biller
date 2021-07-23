export const setBpjsData = (data) => {
    return {
      type: 'SETDATA',
      payload: data
    }
  }

export const setBpjsBillNoPin = (data) => {
  return {
    type: 'SETBILLNOPIN',
    payload: data
  }
}
export const setDataBillBpjs = (data) =>{
  return{
    type: 'SETBPJSBILL',
    payload: data
  }
}  
export const setBpjsReceipt = (data) => {
  return {
    type: 'SETBPJSRECEIPT',
    payload: data
  }
}