import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import reducer from "./reducer";

const store = createStore(reducer,composeWithDevTools());

export {store};