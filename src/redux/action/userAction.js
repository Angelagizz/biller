export const userAct = (token) => {
  return {
    type: "user/login",
    payload: {
      token:token,
    },
  };
};



