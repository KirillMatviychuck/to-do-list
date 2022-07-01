import {addNewTodolistAC, deleteTodolistAC, setTodolistsAC} from "./todolist-reducer";
import {TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppErrorMessage, setAppProgressStatus} from "./app-reducer";
import {handleAppServerError, handleNetworkServerError} from "../utils/handleErrorUtils";


const tasksInitialState: TasksStateType = {}
const tasksReducer = (state: TasksStateType = tasksInitialState, action: ActionType): TasksStateType => {
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
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then(data => {
            dispatch(setTasksAC(data.items, todolistId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppProgressStatus('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(addTaskAC(data.data.item))
                dispatch(setAppProgressStatus('succeeded'))
            }
            handleAppServerError(data, dispatch)
        })
        .catch(error => {
            handleNetworkServerError(error, dispatch)
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(data => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainModelTaskType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, apiModel, todolistId))
                }
                handleAppServerError(data, dispatch)

            })
    }

//types
type ActionType =
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