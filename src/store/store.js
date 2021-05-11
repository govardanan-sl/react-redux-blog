import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import logger from "redux-logger";
import reducer from "./reducer";

const store = createStore(reducer,composeWithDevTools(applyMiddleware(logger)));

export {store};