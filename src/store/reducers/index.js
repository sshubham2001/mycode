import { combineReducers } from "redux";
import user from "./user";
import dashboard from "./dashboard";

export default combineReducers({
  user,
  dashboard,
});
