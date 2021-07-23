export const setMobileOptions = (data) => {
  return {
    type: "SET_MOB_OPTION",
    payload: data,
  };
};

export const setPulsaPriceList = (data) => {
  return {
    type: "SET_PUL_PRI_LIST",
    payload: data,
  };
};

export const setInternetPriceList = (data) => {
  return {
    type: "SET_INT_PRI_LIST",
    payload: data,
  };
};

export const setBillPulsa = (data) => {
  return {
    type: "SET_BILL_PUL",
    payload: data,
  };
};

export const setBillInternet = (data) => {
  return {
    type: "SET_BILL_INT",
    payload: data,
  };
};
