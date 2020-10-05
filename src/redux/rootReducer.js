import {combineReducers} from "redux";
import {jsonReducer} from "./jsonReducer";

export const rootReducer = combineReducers({
    json: jsonReducer
    }
)
