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
      return merge({}, state, { [action.column.id]: action.column });
    case REMOVE_COLUMN:
      const newState = merge({}, state);
      delete newState[action.columnId];
      return newState;
    default:
      return state;
  }
};

export default columnsReducer;
