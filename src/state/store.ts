import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolist-reducer";
import tasksReducer from "./tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../components/Login/auth-reducer";


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store