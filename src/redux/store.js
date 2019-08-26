import { createStore, combineReducers } from 'redux';
import playing from './reducers/playing.js'
const reducer = combineReducers({
    playing,
});

const store = createStore(reducer);

export default store;