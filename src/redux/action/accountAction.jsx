/* eslint-disable no-unused-vars */
import axios from "../../setup/axios";
import Modal from "../../Components/Modal/Modal";
import { createRoot } from "react-dom/client";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

const showSessionExpiredModal = () => {
  return new Promise((resolve) => {
    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);

    const root = createRoot(modalRoot);

    const closeModal = () => {
      root.unmount();
      document.body.removeChild(modalRoot);
      resolve();
    };

    root.render(
      <Modal isOpen={true} onClose={closeModal}>
        <p>Your session has expired. Please log in again.</p>
      </Modal>
    );
  });
};

export const doLogin = (ssoToken) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOGIN_REQUEST });
    axios
      .post(import.meta.env.VITE_BACKEND_VERIFY_TOKEN, { ssoToken })
      .then((res) => {
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

export const doLogout = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LOGOUT_REQUEST });
    axios
      .post("/logout")
      .then((res) => {
        if (res && +res.EC === 1) {
          dispatch({ type: LOGOUT_SUCCESS, user: res.DT });
        } else {
          dispatch({ type: LOGOUT_FAILURE, error: res.EM });
        }
      })
      .catch((err) => {
        dispatch({ type: LOGOUT_FAILURE, error: err.message });
        console.log(err);
      });
  };
};

export const doGetAccount = () => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const res = await axios.get("/account");
      if (res && +res.EC === 1) {
        dispatch({ type: LOGIN_SUCCESS, user: res.DT });
      } else {
        dispatch({ type: LOGIN_FAILURE, error: res.EM });

        if (window.location.pathname !== "/") {
          await showSessionExpiredModal();
          window.location.href = `${
            import.meta.env.VITE_BACKEND_SSO
          }?serviceURL=${import.meta.env.VITE_SERVICE_URL}`;
        }
      }
    } catch (err) {
      dispatch({ type: LOGIN_FAILURE, error: "Something went wrong" });
      console.log(err);
    }
  };
};
