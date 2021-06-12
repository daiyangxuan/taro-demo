import {
  ADD,
  MINUS,
  TOPICS,
} from '../constants/counter'
import { topicsService } from "../services";

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

export const topicsAction = (data) => {
  return {
    type: TOPICS,
    value: data
  }
}

export const topics = () => {
  return (dispatch) => {
    return topicsService().then(
      (data) => dispatch(topicsAction(data))
    )
  }
}

// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
