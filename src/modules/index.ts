import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loading from "./loading";
import snackbar from "./snackbar";
import auth from "./auth";

const rootReducer = combineReducers({ loading, snackbar, auth });

export function* rootSaga() {
   yield all([]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
