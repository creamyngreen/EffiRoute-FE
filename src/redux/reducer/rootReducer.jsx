import { combineReducers } from "redux";

import counterReducer from "./counterReducer";
import accountReducer from "./accountReducer";
import plannerReducer from "./plannerReducer";
import optimizeReducer from "./optimizeReducer";
const rootReducer = combineReducers({
  counter: counterReducer,
  account: accountReducer,
  planner: plannerReducer,
  optimize: optimizeReducer,
});

export default rootReducer;
