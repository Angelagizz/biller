const store = window.localStorage;

const temp = JSON.parse(store.getItem("data"));

const initialState = {
  currentUser: temp || {
    // email: "",
    // token: "",
  },
  allUsers: {
    list: [],
    error: {},
  },
};

const userReducer = (state = initialState, action) => {
  // const { type, payload: { email, token } = {} } = action;
  switch (action.type) {
    case "user/login":
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
