import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistActionsType, todolistReducer} from "../reducers/todolist-reducer";
import tasksReducer, {TasksActionType} from "../reducers/tasks-reducer";
import thunk from "redux-thunk";
import {appReducer, AppReducerActionsType} from "../reducers/app-reducer";
import {AuthActionType, authReducer} from "../components/Login/auth-reducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

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