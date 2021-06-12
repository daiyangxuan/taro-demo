import { combineReducers } from 'redux'
import counter from './counter'
import cncode from "./cncode";

export default combineReducers({
  counter,
  cncode,
})
