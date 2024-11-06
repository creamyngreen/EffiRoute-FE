import { combineReducers } from "redux";

import counterReducer from "./counterReducer";
import accountReducer from "./accountReducer";
import plannerReducer from "./plannerReducer";
const rootReducer = combineReducers({
  counter: counterReducer,
  account: accountReducer,
  planner: plannerReducer,
});

export default rootReducer;
