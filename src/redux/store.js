import rootReducer from "./reducer/rootReducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { injectStore } from "./../setup/axios";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
injectStore(store);
export default store;
