import { combineReducers } from "redux";
import loading from "./loading";
import snackbar from "./snackbar";
import auth from "./auth";
import pushToken from "./pushToken";

const rootReducer = combineReducers({
   loading,
   snackbar,
   auth,
   pushToken,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
