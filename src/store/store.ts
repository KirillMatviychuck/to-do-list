import {combineReducers} from "redux";
import {TodolistActionsType, todolistReducer} from "../reducers/todolist-reducer";
import {TasksActionType, tasksReducer} from "../reducers/tasks-reducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import thunkMiddleware from "redux-thunk";
import {appReducer, AppReducerActionsType} from "../reducers/app-reducer";
import {AuthActionType, authReducer} from "../components/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType =
    | AppReducerActionsType
    | TasksActionType
    | TodolistActionsType
    | AuthActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>


// @ts-ignore
window.store = store