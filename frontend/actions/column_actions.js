import {
  fetchColumns,
  fetchColumn,
  postColumn,
  patchColumn,
  destroyColumn,
} from '../util/column_util';

export const RECEIVE_COLUMNS = 'RECEIVE_COLUMNS';
export const RECEIVE_COLUMN = 'RECEIVE_COLUMN';
export const REMOVE_COLUMN = 'REMOVE_COLUMN';

const receiveColumns = columns => ({
  type: RECEIVE_COLUMNS,
  columns,
});

const receiveColumn = column => ({
  type: RECEIVE_COLUMN,
  column,
});

const removeColumn = columnId => ({
  type: REMOVE_COLUMN,
  columnId,
});

export const requestColumns = project_id => dispatch =>
  fetchColumns(project_id).then(columns =>
    dispatch(receiveColumns(columns))
  );

export const requestColumn = id => dispatch =>
  fetchColumn(id).then(column => dispatch(receiveColumn(column)));

export const createColumn = column => dispatch =>
  postColumn(column).then(column =>
    dispatch(receiveColumn(column))
  );

export const updateColumn = column => dispatch =>
  patchColumn(column).then(column => {
    dispatch(receiveColumn(column))
  });

export const deleteColumn = id => dispatch =>
  destroyColumn(id).then(column => dispatch(removeColumn(id)));
