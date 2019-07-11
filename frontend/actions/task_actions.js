import {
  fetchTasks,
  fetchTask,
  postTask,
  patchTask,
  destroyTask
} from "../util/task.util";

export const RECEIVE_TASKS = "RECEIVE_TASKS";
export const RECEIVE_TASK = "RECEIVE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";

export const requestTasks = column_id => dispatch =>
  fetchTasks(column_id).then(tasks => dispatch(receiveTasks(tasks)));

export const requestTask = id => dispatch =>
  fetchTask(id).then(task => dispatch(receiveTask(task)));

export const createTask = task => dispatch =>
  postTask(task).then(task =>
    dispatch(receiveTask(task))
  );

export const updateTask = task => dispatch =>
  patchTask(task).then(task => dispatch(receiveTask(task)));

export const deleteTask = id => dispatch =>
  destroyTask(id).then(task => dispatch(removeTask(id)));

const receiveTasks = tasks => ({
  type: RECEIVE_TASKS,
  tasks
});

const receiveTask = task => ({
  type: RECEIVE_TASK,
  task
});

const removeTask = taskId => ({
  type: REMOVE_TASK,
  taskId
});
