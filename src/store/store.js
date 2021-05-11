import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import logger from "redux-logger";
import reducer from "./reducer";

import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:'blog',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(logger)));

const persistor = persistStore(store);

export {store,persistor};