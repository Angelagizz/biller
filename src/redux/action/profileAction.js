export const getProfileData = (data) => {
  return {
    type: "user/detail",
    payload: {
      data,
    },
  };
};

export const getUserPayment = (data) => {
  return {
    type: "SET_USER_PAYMENT",
    payload: {
      data,
    },
  };
};

export const changePaymentMethod = (card_number, type)=>{
  return{
      type:'CHANGE_USER_PAYMENT',
      payload:{
        card_number:card_number,
        card_holder_name:'',
        expire_date :'',
        cvv:'',
        type:type
      }
  }
}

export const setReload = (data) => {
  return {
    type: "SET_RELOAD",
    payload: {
      data,
    },
  };
};
