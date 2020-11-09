import React from 'react';
import ReactDOM from 'react-dom';
import 'globals/styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux"
import { rootReducer } from "./rootReducer";
import createSagaMiddleware from "redux-saga"
import { sagaWatcher } from "./sagas";

const saga = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(saga)
)

saga.run(sagaWatcher);

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app,
  document.getElementById('root')
);

serviceWorker.unregister();
