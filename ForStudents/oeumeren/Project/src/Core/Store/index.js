import { createStore, compose, applyMiddleware } from "redux";
import initReducers from "./reducers";

import middleware from "@middleware/index.js";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: "my_chat",
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['messagesReducer', 'chatReducer']
}

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {};
export const history = createBrowserHistory();

const initStore = () => {
    const store = createStore(
        persistReducer(persistConfig, initReducers(history)),
        {},
        compose( applyMiddleware(routerMiddleware(history), ...middleware), reduxDevTools )
    );

    const persistor = persistStore(store);

    return { store, persistor };
}

export default initStore;