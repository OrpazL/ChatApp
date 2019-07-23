import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import * as redux from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { authReducer, IAuthReducer } from './Store/Reducers/Auth.reducer';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


export interface IReducers {
    AuthReducer: IAuthReducer;
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
const logger: any = (store: IReducers) => {
    return (next: any) => {
        return (action: any) => {
            console.log('TCL: action', action);
            const result = next(action);
            console.log('TCL: const result', result);
            return result;
        };
    };
};

const reducer: redux.Reducer<IReducers> = redux.combineReducers(({
    AuthReducer: authReducer
}))
const store = redux.createStore(reducer, composeEnhancers(redux.applyMiddleware(logger, thunk)))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

serviceWorker.register();