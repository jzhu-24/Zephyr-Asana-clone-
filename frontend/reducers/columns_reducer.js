import {
  RECEIVE_COLUMNS,
  RECEIVE_COLUMN,
  REMOVE_COLUMN
} from "../actions/column_actions";
import merge from "lodash/merge";

const columnsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_COLUMNS:
      return merge({}, state, action.columns);
    case RECEIVE_COLUMN:
      console.log("current action: ", action.column);
      let task = merge({}, action.column.task);
      let newState2 = merge({}, state, { [action.column.id]: action.column });
      newState2.task = task;
      return newState2;
    case REMOVE_COLUMN:
      const newState = merge({}, state);
      delete newState[action.columnId];
      return newState;
    default:
      return state;
  }
};

export default columnsReducer;
