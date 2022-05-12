import {AddNewTodolistType, RemoveTodolistType} from "./todolist-reducer";
import {v1} from "uuid";

type ActionType = ChangeTaskStatusType | RemoveTaskType | AddTaskType | ChangeTaskTextType
    | AddNewTodolistType | RemoveTodolistType

type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    toDoListId: string
    taskId: string
    status: boolean
}
type RemoveTaskType = {
    type: 'REMOVE-TASK'
    toDoListId: string
    id: string
}
type AddTaskType = {
    type: 'ADD-TASK'
    toDoListId: string
    text: string
}
type ChangeTaskTextType = {
    type: 'CHANGE-TASK-TEXT'
    toDoListId: string
    taskId: string
    newValue: string
}

type TaskType = {
    id: string
    text: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const tasksInitialState: TasksStateType = {}
const tasksReducer = (state: TasksStateType = tasksInitialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'CHANGE-TASK-STATUS': {
            let stateCopy = {...state}
            let todolist = stateCopy[action.toDoListId]
            stateCopy[action.toDoListId] = todolist.map(t => t.id === action.taskId ? {...t, isDone: action.status} : t)
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
            const newTask = {id: v1(), text: action.text, isDone: false}
            stateCopy[action.toDoListId] = [...stateCopy[action.toDoListId], newTask]
            return stateCopy;
        }
        case 'CHANGE-TASK-TEXT': {
            let stateCopy = {...state}
            let task = stateCopy[action.toDoListId]
            stateCopy[action.toDoListId] = task.map(t => t.id === action.taskId ? {...t, text: action.newValue} : t)
            return stateCopy
        }
        case 'ADD-NEW-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.toDoListId]
            return stateCopy
        }
        default:
            return state;
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, toDoListId: string): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', status: isDone, toDoListId, taskId}
}
export const removeTaskAC = (id: string, toDoListId: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', toDoListId, id}
}
export const addTaskAC = (text: string, toDoListId: string): AddTaskType => {
    return {type: 'ADD-TASK', toDoListId, text}
}
export const changeTaskTextAC = (taskId: string, newValue: string, toDoListId: string): ChangeTaskTextType => {
    return {type: 'CHANGE-TASK-TEXT', toDoListId, taskId, newValue}
}

export default tasksReducer;