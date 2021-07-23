const initialState = {
  infocust: [],
  statusModal: false,
};

const landlineReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SETACC":
      return {
        ...state,
        infocust: [action.payload],
        landlinebill: [action.payload],
      };
    case "SETCLOSE":
      return {
        ...state,
        statusModal: !state.statusModal,
      };

    default:
      return state;
  }
};

export default landlineReducer;
