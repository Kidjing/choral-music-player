import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducer';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import saga from './saga';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['tagReducer', 'musicReducer', 'searchRecordReducer', 'personalFmReducer', 'playingReducer'],
    blacklist: [],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

export const getPersistor = () => {
    // 修改store之后要对版本号进行修改
    const deployVer = '0.1.0';
    const curVersion = localStorage.getItem('myAppVer');

    if (typeof curVersion === 'undefined' || curVersion === null || curVersion !== deployVer) {
        localStorage.removeItem('persist:root');
        localStorage.setItem('myAppVer', deployVer);
    }

    return persistStore(store);
};

export const persistor = getPersistor();

sagaMiddleware.run(saga);
