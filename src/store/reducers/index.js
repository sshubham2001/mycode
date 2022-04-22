import { combineReducers } from "redux";
import user from "./user";
import dashboard from "./dashboard";
import orderAlert from "./orderAlert";
import rtNotify from "./rtNotification";

export default combineReducers({
  user,
  dashboard,
  orderAlert,
  rtNotify,
});
