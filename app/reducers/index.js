import { combineReducers } from 'redux';
import routes from './routes';
import entrance from './entrance';

const rootReducer = combineReducers({
    routes,
    entrance
});

export default rootReducer;