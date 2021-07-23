const initialState = {
  option: [],
  PULSAPriceList: [],
  billToken: [],
  billTagihan: [],
};

const mobileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MOB_OPT":
      return {
        ...state,
        option: action.payload,
      };
    case "SET_PUL_PRI_LIST":
      return {
        ...state,
        pulsaPriceList: action.payload,
      };

    case "SET_INT_PRI_LIST":
      return {
        ...state,
        internetPriceList: action.payload,
      };
    case "SET_BILL_PUL":
      return {
        ...state,
        billPulsa: [action.payload],
      };
    case "SET_BILL_INT":
      return {
        ...state,
        billInternet: [action.payload],
      };
    default:
      return state;
  }
};

export default mobileReducer;
