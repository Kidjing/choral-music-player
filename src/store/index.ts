import { createStore, applyMiddleware } from "redux"
import { reducer } from "./reducer"
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist'
import saga from "./saga";


const persistConfig = {
    key: "root",
    storage,
    whitelist: ['tagReducer','musicReducer','searchRecordReducer','personalFmReducer'],
    blacklist: [], 
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

export const persistor = persistStore(store)

sagaMiddleware.run(saga)