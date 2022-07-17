import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppProgressStatusType, setAppErrorMessage, setAppProgressStatus} from "./app-reducer";
import {AppThunk} from "../store/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

export const todolistSlice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        deleteTodolistAC(state, action: PayloadAction<{todolistId: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addNewTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>) {
            state.unshift({...action.payload.todolist, filter: 'all', todolistStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{id: string, newTitle: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.newTitle
        },
        changeTodolistFilterAC(state, action: PayloadAction<{value: FilterTypes, toDoListId: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.toDoListId)
            state[index].filter = action.payload.value
        },
        changeTodolistProgressStatus(state, action: PayloadAction<{id: string, status: AppProgressStatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].todolistStatus = action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<{todolists: Array<TodolistType>}>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', todolistStatus: 'idle'}))
        }
    }
})

export const todolistReducer = todolistSlice.reducer
export const {deleteTodolistAC, addNewTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, changeTodolistProgressStatus,
    setTodolistsAC} = todolistSlice.actions

// thunks
export const fetchTodolistsTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppProgressStatus({status: 'loading'}))
    let data = await todolistsAPI.getTodolists()
    try {
        dispatch(setTodolistsAC({todolists: data}))
        dispatch(setAppProgressStatus({status: 'succeeded'}))
    } catch (error) {
        console.warn(error)
        dispatch(setAppProgressStatus({status: 'failed'}))
    }
}
export const createTodolistTC = (title: string): AppThunk => async (dispatch) => {
    dispatch(setAppProgressStatus({status: 'loading'}))
    try {
        const data = await todolistsAPI.createTodolist(title)
        dispatch(addNewTodolistAC({todolist: data.data.item}))
        dispatch(setAppProgressStatus({status: 'succeeded'}))
    } catch (error) {
        dispatch(setAppErrorMessage({errorMessage: `${error}`}))
        dispatch(setAppProgressStatus({status: 'failed'}))
    }

}
export const deleteTodolistTC = (id: string): AppThunk => async (dispatch) => {
    dispatch(changeTodolistProgressStatus({id: id, status: 'loading'}))
    dispatch(setAppProgressStatus({status: 'loading'}))
    try {
        const data = await todolistsAPI.deleteTodolist(id)
        dispatch(deleteTodolistAC({todolistId: id}))
        dispatch(setAppProgressStatus({status: 'succeeded'}))
    } catch (error) {
        dispatch(setAppErrorMessage({errorMessage: `${error}`}))
        dispatch(setAppProgressStatus({status: 'failed'}))
    }

}
export const changeTodolistTitleTC = (id: string, newTitle: string): AppThunk => async (dispatch) => {
    try {
        await todolistsAPI.updateTodolist(id, newTitle)
        dispatch(changeTodolistTitleAC({id, newTitle}))
    } catch (error) {
        dispatch(setAppErrorMessage({
            errorMessage: `${error}`
        }))
        dispatch(setAppProgressStatus({status: 'failed'}))
    }

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

