import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "./state/todolist-reducer";
import tasksReducer from "./state/tasks-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store