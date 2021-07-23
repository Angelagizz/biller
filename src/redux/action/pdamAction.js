export const getRegionAll = (data) => {
  return {
    type: "GET_REGION",
    payload: data,
  };
};

export const setSearchKey = (key) => {
  return {
    type: "SETSEARCHKEY",
    payload: key,
  };
};

export const getAccountPdam = (data) => {
  return {
    type: "GET_ACCOUNT",
    payload: data,
  };
};
export const newBillPdam = (data) => {
  return {
    type: "SETBILLPDAM",
    payload: data,
  };
};
export const setDataBillPdam = (data) => {
  return {
    type: 'SETDATABILL',
    payload: data
  }
}
export const setPdamReceipt = (data) => {
  return {
    type: 'SETUPLOADRECEIPT',
    payload: data
  }
}