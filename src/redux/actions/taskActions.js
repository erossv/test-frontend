import apiRequest from './api';
import { GET_TASKS_SUCCESS, CREATE_TASK_SUCCESS, DELETE_TASK_SUCCESS, UPDATE_TASK_SUCCESS } from '../actionTypes';

export const createTaskSuccess = (task) => ({
    type: CREATE_TASK_SUCCESS,
    task,
});

export const getTasksSuccess = (totalCount, data) => ({
    type: GET_TASKS_SUCCESS,
    tasks: data,
    totalCount
});

export const deleteTaskSuccess = (taskId) => ({
    type: DELETE_TASK_SUCCESS,
    taskId,
});

export const updateTaskSuccess = (task) => ({
    type: UPDATE_TASK_SUCCESS,
    task,
});

export const createTask = (taskInfo) => async (dispatch) => {
    try {
        const task = await apiRequest('/api/task', 'POST', taskInfo);
        dispatch(createTaskSuccess(task));
    } catch (error) {
        console.error('Error creating task:', error.message);
    }
};

export const getTasks = (paginationInfo) => async (dispatch) => {
    try {
        const { totalCount, data } = await apiRequest(`/api/tasks?page=${paginationInfo.page}&pageSize=${paginationInfo.pageSize}`, 'GET');
        dispatch(getTasksSuccess(totalCount, data));
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
    }
};

export const deleteTask = (taskId) => async (dispatch) => {
    try {
        await apiRequest(`/api/tasks/${taskId}`, 'DELETE');
        dispatch(deleteTaskSuccess(taskId));
    } catch (error) {
        console.error('Error deleting task:', error.message);
    }
};

export const updateTask = (updatedData) => async (dispatch) => {
    try {
        const { id: taskId, ...taskInfo } = updatedData;
        const updatedTask = await apiRequest(`/api/tasks/${taskId}`, 'PUT', taskInfo);
        dispatch(updateTaskSuccess(updatedTask));
    } catch (error) {
        console.error('Error updating task:', error.message);
    }
};