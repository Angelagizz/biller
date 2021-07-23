const initialState = {
  data: [],
  searchKey: "",
  pdamAcc: [],
  pdamBillNoPin: [],
  databills: [],
  receipt: []
};

const pdamReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_REGION":
      return {
        ...state,
        data: state.data.concat(payload),
      };
    case "SETSEARCHKEY":
      return {
        ...state,
        searchKey: payload,
      };

    case "GET_ACCOUNT":
      return {
        ...state,
        pdamAcc: [payload],
      };
    case 'SETBILLPDAM':
      return{
        ...state,
        pdamBillNoPin: payload
      };
    case 'SETDATABILL':
      return{
        ...state,
        databills: [payload]
      };

    case 'SETUPLOADRECEIPT':
      return{
                ...state,
                receipt : [payload]
            }

    // case "user/fetchAllError":
    //   return {
    //     ...state,
    //     allUsers: {
    //       ...state.allUsers,
    //       error,
    //     },
    //   };
    default:
      return state;
  }
};
export default pdamReducer;
