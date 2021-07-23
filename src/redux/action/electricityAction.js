export const setElectricityOptions = (data) => {
    return {
      type: 'SET_ELE_OPT',
      payload: data
    }
  }

export const setTokenPriceList = (data) => {
    return {
      type: 'SET_TOK_PRI_LIST',
      payload: data
    }
  }

export const setBillToken = (data) => {
  return {
    type: 'SET_BILL_TOKEN',
    payload: data
  }
}

export const setBillTokenLagi = (data) => {
  return {
    type: 'SET_BILL_TOKEN_LAGI',
    payload: data
  }
}

export const setBillTagihan = (data) => {
  return {
    type: 'SET_BILL_TAGIHAN',
    payload : data
  }
}

export const setBillTagihanLagi = (data) => {
  return {
    type: 'SET_BILL_TAGIHAN_LAGI',
    payload : data
  }
}

export const setReceiptToken = (data) => {
  return {
    type: 'SET_RECEIPT_TOKEN',
    payload: data
  }
}

export const setReceiptTagihan = (data) => {
  return {
    type: 'SET_RECEIPT_TAGIHAN',
    payload: data
  }
}
