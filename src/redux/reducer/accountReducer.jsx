import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../action/accountAction";

const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    email: "",
    username: "",
    roles: {},
  },
  isLoading: false,
  errMessage: "",
};

const accountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        errMessage: "",
      };

    case LOGIN_SUCCESS:
      console.log("action", action);
      return {
        ...state,
        account: action.user,
        isLoading: false,
        errMessage: "",
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMessage: action.error,
      };

    default:
      return state;
  }
};

export default accountReducer;
