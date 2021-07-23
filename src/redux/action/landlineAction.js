export const setLandlineInfo = (data) => {
  return {
    type: "SETACC",
    payload: data,
  };
};

export const setBillLandline = (data) => {
  return {
    type: "SETLANDLINEBILL",
    payload: data,
  };
};

export const setLandlineCust = (data) => {
  return {
    type: "SETCUST",
    payload: data,
  };
};

export const setLandlineReceipt = (data) => {
  return {
    type: "SETLANDLINERECEIPT",
    payload: data,
  };
};

export const setCloseModal = () => {
  return {
    type: "SETCLOSE",
  };
};
