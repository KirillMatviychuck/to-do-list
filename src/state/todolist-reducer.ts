import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

export type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    toDoListId: string
}
export type AddNewTodolistType = {
    type: 'ADD-NEW-TODOLIST'
    todolistId: string
    title: string
}
type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    newTitle: string
}
export type FilterTodolistType = {
    type: 'CHANGE-TODOLIST-FILTER'
    toDoListId: string
    value: FilterTypes
}

type ActionsType = RemoveTodolistType | AddNewTodolistType | ChangeTodolistTitleType | FilterTodolistType


const initialState: Array<TodolistDomainType> = []

export type FilterTypes = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: FilterTypes
}

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.toDoListId);
        case 'ADD-NEW-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 1}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            let changedTodolist = state.find(t => t.id === action.id)
            if (changedTodolist) changedTodolist.title = action.newTitle
            return [
                ...state,
            ];
        case 'CHANGE-TODOLIST-FILTER':
            let filteredTodolist = state.find(t => t.id === action.toDoListId)
            if (filteredTodolist) filteredTodolist.filter = action.value
            return [
                ...state,
            ];

        default:
            return state;
    }
}

export const removeTodolistAC = (toDoListId: string): RemoveTodolistType => {
    return {type: 'REMOVE-TODOLIST', toDoListId}
}
export const addNewTodolistAC = (title: string): AddNewTodolistType => {
    return {type: 'ADD-NEW-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, newTitle: string): ChangeTodolistTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, newTitle}
}
export const changeTodolistFilterAC = (value: FilterTypes, toDoListId: string): FilterTodolistType => {
    return {type: 'CHANGE-TODOLIST-FILTER', value, toDoListId}
}