import { TOPICS } from "../constants/counter";
import React, { Component } from "react";

import { topicsService } from "../services";

const INITIAL_STATE = {
  topicsData: {},
};

export default function CnCode(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOPICS:
      if (action.value.data && action.value.data.success) {
        return {
          ...state,
          topicsData: action.value.data.data,
        };
      } else {
        return {
          ...state,
          topicsData: {},
        };
      }
    default:
      return state;
  }
}
