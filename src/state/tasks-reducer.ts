import {AddNewTodolistType, RemoveTodolistType} from "./todolist-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

type ActionType = ChangeTaskStatusType | RemoveTaskType | AddTaskType | ChangeTaskTextType
    | AddNewTodolistType | RemoveTodolistType

type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    toDoListId: string
    taskId: string
    status: TaskStatuses
}
type RemoveTaskType = {
    type: 'REMOVE-TASK'
    toDoListId: string
    id: string
}
type AddTaskType = {
    type: 'ADD-TASK'
    todoListId: string
    title: string
}
type ChangeTaskTextType = {
    type: 'CHANGE-TASK-TEXT'
    toDoListId: string
    taskId: string
    newValue: string
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
            stateCopy[action.toDoListId] = todolist.map(t => t.id === action.taskId ? {...t, status: action.status} : t)
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
            const newTask = {
                description: '',
                title: action.title,
                status: TaskStatuses.New,
                priority: 0,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: action.todoListId,
                order: 0,
                addedDate: ''
            }

            stateCopy[action.todoListId] = [...stateCopy[action.todoListId], newTask]
            return stateCopy;
        }
        case 'CHANGE-TASK-TEXT': {
            let stateCopy = {...state}
            let task = stateCopy[action.toDoListId]
            stateCopy[action.toDoListId] = task.map(t => t.id === action.taskId ? {...t, title: action.newValue} : t)
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

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, toDoListId: string): ChangeTaskStatusType => {
    debugger
    return {type: 'CHANGE-TASK-STATUS', status, toDoListId, taskId}
}
export const removeTaskAC = (id: string, toDoListId: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', toDoListId, id}
}
export const addTaskAC = (title: string, todoListId: string): AddTaskType => {
    return {type: 'ADD-TASK', todoListId, title}
}
export const changeTaskTextAC = (taskId: string, newValue: string, toDoListId: string): ChangeTaskTextType => {
    return {type: 'CHANGE-TASK-TEXT', toDoListId, taskId, newValue}
}

export default tasksReducer;