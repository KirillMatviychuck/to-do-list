import {addNewTodolistAC, deleteTodolistAC, setTodolistsAC} from "./todolist-reducer";
import {TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";

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

const tasksInitialState: TasksStateType = {}
const tasksReducer = (state: TasksStateType = tasksInitialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'UPDATE-TASK': {
            let stateCopy = {...state}
            let todolist = stateCopy[action.toDoListId]
            stateCopy[action.toDoListId] = todolist.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            return {...stateCopy}
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.toDoListId]
            stateCopy[action.toDoListId] = tasks.filter(t => t.id !== action.id)
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy;
        }
        case 'ADD-NEW-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolist.id] = []
            return stateCopy
        }
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
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
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
    todolistsAPI.createTask(todolistId, title)
        .then(data => {
            dispatch(addTaskAC(data.data.item))
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
            dispatch(updateTaskAC(taskId,apiModel,todolistId))
        })
}

export default tasksReducer;