import { combineReducers } from "redux";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";
import pdamReducer from "./reducers/pdamReducer";
import paymentMethodReducer from "./reducers/paymentReducer";
import internetReducer from "./reducers/internetReducer";
import bpjsReducer from "./reducers/bpjsReducer";
import landlineReducer from "./reducers/landlineReducer"
import electricityReducer from "./reducers/electricityReducer";
import recurringReducer from "./reducers/recurringReducer";
import profileReducer from "./reducers/profileReducer"
import historyReducer from "./reducers/historyReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  pdam: pdamReducer,
  payment: paymentMethodReducer,
  internet: internetReducer,
  bpjs: bpjsReducer,
  landline: landlineReducer,
  electricity : electricityReducer,
  recurring : recurringReducer,
  profile: profileReducer,
  history: historyReducer,
});

export default rootReducer;
