import React from 'react';
import ReactDOM from 'react-dom';
import 'globals/styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux"
import { rootReducer } from "./rootReducer";
import createSagaMiddleware from "redux-saga"
import { sagaWatcher } from "./sagas";

const saga = createSagaMiddleware();

const store = createStore(
    rootReducer,
    compose(applyMiddleware(saga),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
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
