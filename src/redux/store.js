import { createStore ,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Reducers } from './combineReducer';
import logger from "redux-logger";
let middleware=[];

if(process.env.NODE_ENV === 'production'){
    middleware = [thunk];
}
else{
    middleware = [thunk,logger];
}

const Store = createStore(Reducers, applyMiddleware(...middleware));

export default Store;