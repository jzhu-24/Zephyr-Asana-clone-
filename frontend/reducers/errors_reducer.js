import { combineReducers } from "redux";
import sessionErrors from "./session_errors_reducer";
import workspaceErrors from "./workspaces_errors_reducer";

export default combineReducers({
  session: sessionErrors,
  workspace: workspaceErrors
});
