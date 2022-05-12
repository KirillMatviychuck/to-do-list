import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./state/todolist-reducer";
import tasksReducer from "./state/tasks-reducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)