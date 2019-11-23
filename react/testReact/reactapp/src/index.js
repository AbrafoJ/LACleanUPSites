import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReducer'
//import authReducer from './store/reducers/authReducer'

//root reducer combines auth and project reducer
//now pass into app so that it has access to store
//const store = createStore(rootReducer);

export default function configureStore(){
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
}

const store = configureStore();

// provider binds react and redux SANDWICHES THE APP
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
