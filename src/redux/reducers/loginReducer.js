const initialState = {
  email: "",
  password: "",
  statusText: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        statusText: action.payload.statusText,
        // login: (state, action) => {
        //   state.user = action.state.login;
        // },
      };
    default:
      return { ...state };
  }
};

export default loginReducer;
