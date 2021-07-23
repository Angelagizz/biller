export const handleLogin = (email, password, statusText) => {
  return {
    type: "LOGIN",
    payload: {
      email: email,
      password: password,
      statusText: statusText,
    },
  };
};
