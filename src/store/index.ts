import { createStore ,applyMiddleware} from "redux"
import { reducer } from "./reducer"
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import saga from "./saga";

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(reducer,composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(saga)