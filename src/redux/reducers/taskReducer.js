import { GET_TASKS_SUCCESS, CREATE_TASK_SUCCESS, DELETE_TASK_SUCCESS, UPDATE_TASK_SUCCESS } from '../actionTypes';

const initialState = {
    tasks: [],
    totalCount: 0
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                tasks: [action.task, ...state.tasks],
                totalCount: state.totalCount + 1
            };
        case GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.tasks,
                totalCount: action.totalCount
            };
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.taskId),
                totalCount: state.totalCount - 1
            };
        case UPDATE_TASK_SUCCESS: {
            const updatedTaskIndex = state.tasks.findIndex((task) => task.id === action.task.id);

            return updatedTaskIndex !== -1
                ? {
                    ...state,
                    tasks: state.tasks.map((task, index) =>
                        index === updatedTaskIndex ? action.task : task
                    ),
                }
                : state;
        }
        default:
            return state;
    }
};

export default taskReducer;

