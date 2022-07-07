import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppProgressStatusType, setAppProgressStatus} from "./app-reducer";
import {AppThunk} from "../store/store";

const initialState: Array<TodolistDomainType> = []

const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.toDoListId);
        case 'ADD-NEW-TODOLIST':
            return [{...action.todolist, filter: 'all', todolistStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.toDoListId ? {...tl, title: action.value} : tl)
        case 'CHANGE-TODOLIST-PROGRESS-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, todolistStatus: action.status} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', todolistStatus: 'idle'}))
        default:
            return state;
    }
}

// actions
export const deleteTodolistAC = (toDoListId: string) =>
    ({type: 'REMOVE-TODOLIST', toDoListId} as const)
export const addNewTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-NEW-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, newTitle: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, newTitle} as const)
export const changeTodolistFilterAC = (value: FilterTypes, toDoListId: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', value, toDoListId} as const)
export const changeTodolistProgressStatus = (id: string, status: AppProgressStatusType) =>
    ({type: 'CHANGE-TODOLIST-PROGRESS-STATUS', id, status} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)

// thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppProgressStatus('loading'))
    todolistsAPI.getTodolists()
        .then(data => {
            dispatch(setTodolistsAC(data))
            dispatch(setAppProgressStatus('succeeded'))
        })
        .catch(error => {
            console.warn(error)
            dispatch(setAppProgressStatus('failed'))
        })
}
export const createTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppProgressStatus('loading'))
    todolistsAPI.createTodolist(title)
        .then(data => {
            dispatch(addNewTodolistAC(data.data.item))
            dispatch(setAppProgressStatus('succeeded'))
        })
}
export const deleteTodolistTC = (id: string): AppThunk => (dispatch) => {
    dispatch(changeTodolistProgressStatus(id, 'loading'))
    dispatch(setAppProgressStatus('loading'))
    todolistsAPI.deleteTodolist(id)
        .then(res => {
            dispatch(deleteTodolistAC(id))
            dispatch(setAppProgressStatus('succeeded'))
        })
}
export const changeTodolistTitleTC = (id: string, newTitle: string): AppThunk => (dispatch) => {
    todolistsAPI.updateTodolist(id, newTitle)
        .then(data => {
            dispatch(changeTodolistTitleAC(id, newTitle))
        })
}

// types
export type TodolistActionsType =
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof addNewTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistProgressStatus>
export type FilterTypes = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: FilterTypes,
    todolistStatus: AppProgressStatusType
}

export {todolistReducer}