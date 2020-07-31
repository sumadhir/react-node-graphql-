import { combineReducers } from 'redux';
import homeReducer from "./home-reducer";

const reducers = combineReducers({
    home:homeReducer
});

export default reducers;