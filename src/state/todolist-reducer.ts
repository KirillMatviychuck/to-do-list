import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

type ActionsType =
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof addNewTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>



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
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            const stateCopy = [...state]
            let changedTodolist = stateCopy.find(t => t.id === action.id)
            if (changedTodolist) changedTodolist.title = action.newTitle
            return [
                ...stateCopy,
            ];
        case 'CHANGE-TODOLIST-FILTER':
            let filteredTodolist = state.find(t => t.id === action.toDoListId)
            if (filteredTodolist) filteredTodolist.filter = action.value
            return [
                ...state,
            ];
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state;
    }
}

//actions
export const deleteTodolistAC = (toDoListId: string) =>
    ({type: 'REMOVE-TODOLIST', toDoListId} as const)
export const addNewTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-NEW-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, newTitle: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, newTitle} as const)
export const changeTodolistFilterAC = (value: FilterTypes, toDoListId: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', value, toDoListId} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)

//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(data => {
            dispatch(setTodolistsAC(data))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(data => {
            dispatch(addNewTodolistAC(data.data.item))
        })
}
export const deleteTodolistTC = (id: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(id)
        .then(res => {
            dispatch(deleteTodolistAC(id))
        })
}
export const changeTodolistTitleTC = (id: string, newTitle: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, newTitle)
        .then(data => {
            dispatch(changeTodolistTitleAC(id, newTitle))
        })
}