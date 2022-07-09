import {addNewTodolistAC, deleteTodolistAC, setTodolistsAC} from "./todolist-reducer";
import {TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {AppThunk} from "../store/store";
import {setAppErrorMessage, setAppProgressStatus} from "./app-reducer";
import {handleAppServerError, handleNetworkServerError} from "../utils/handleErrorUtils";


const tasksInitialState: TasksStateType = {}
const tasksReducer = (state: TasksStateType = tasksInitialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'REMOVE-TASK':
            return {...state, [action.toDoListId]: state[action.toDoListId].filter(t => t.id !== action.id)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'ADD-NEW-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.toDoListId]
            return stateCopy
        }
        case 'SET-TODOLISTS':
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}

//actions
export const updateTaskAC = (taskId: string, model: UpdateDomainModelTaskType, toDoListId: string) =>
    ({type: 'UPDATE-TASK', model, toDoListId, taskId} as const)
export const removeTaskAC = (id: string, toDoListId: string) =>
    ({type: 'REMOVE-TASK', toDoListId, id} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

//thunks
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then(data => {
            dispatch(setTasksAC(data.items, todolistId))
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    dispatch(setAppProgressStatus('loading'))
    try {
        const data = await todolistsAPI.createTask(todolistId, title)
        if (data.resultCode === 0) {
            dispatch(addTaskAC(data.data.item))
            dispatch(setAppProgressStatus('succeeded'))
        } else {
            handleAppServerError(data, dispatch)
        }
    } catch (error) {
        handleNetworkServerError({message: `${error}`}, dispatch)
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => async (dispatch) => {
    try {
        await todolistsAPI.deleteTask(todolistId, taskId)
        dispatch(removeTaskAC(taskId, todolistId))
    } catch (error) {
        dispatch(setAppErrorMessage(`${error}`))
    }
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainModelTaskType): AppThunk =>
    async (dispatch, getState) => {
        const task = getState().tasks[todolistId].find(task => task.id === taskId)
        if (!task) {
            console.warn(`task not found`)
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        try {
            const data = await todolistsAPI.updateTask(todolistId, taskId, apiModel)
            if (data.resultCode === 0) {
                dispatch(updateTaskAC(taskId, apiModel, todolistId))
            } else {
                handleAppServerError(data, dispatch)
            }
        } catch (error) {
            dispatch(setAppErrorMessage(`${error}`))
        }
    }

//types
export type TasksActionType =
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addNewTodolistAC>
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof setTodolistsAC>
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateDomainModelTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export default tasksReducer;