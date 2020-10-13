import { combineReducers } from "redux";
import {connectRouter} from 'connected-react-router'
import common from "./Common";

export default (history) => combineReducers({
    router: connectRouter(history),
    common: common,
});
