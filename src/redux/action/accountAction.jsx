import axios from "../../setup/axios";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const doLogin = (ssoToken) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOGIN_REQUEST });
    axios
      .post(import.meta.env.VITE_BACKEND_VERIFY_TOKEN, { ssoToken })
      .then((res) => {
        console.log(res);
        if (res && +res.EC === 1) {
          dispatch({ type: LOGIN_SUCCESS, user: res.DT });
        } else {
          dispatch({ type: LOGIN_FAILURE, error: res.EM });
        }
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILURE, error: err.message });
        console.log(err);
      });
  };
};
