import {addNewTodolistAC, deleteTodolistAC, setTodolistsAC} from "./todolist-reducer";
import {TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {AppRootStateType, AppThunk} from "../store/store";
import {setAppErrorMessage, setAppProgressStatus} from "./app-reducer";
import {handleAppServerError, handleNetworkServerError} from "../utils/handleErrorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const tasksInitialState: TasksStateType = {}


export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: tasksInitialState,
    reducers: {
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainModelTaskType, toDoListId: string }>) {
            const tasks = state[action.payload.toDoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        removeTaskAC(state, action: PayloadAction<{ id: string, toDoListId: string }>) {
            const tasks = state[action.payload.toDoListId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            tasks.splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewTodolistAC, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(deleteTodolistAC, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(setTodolistsAC, (state, action) => {
                action.payload.todolists.forEach((tl: any) => {
                    state[tl.id] = []
                })
            })
    }
})

export const tasksReducer = tasksSlice.reducer
export const {updateTaskAC, removeTaskAC, addTaskAC, setTasksAC} = tasksSlice.actions

//thunks
export const fetchTasksTC = (todolistId: string): AppThunk => async (dispatch) => {
    try {
        const data = await todolistsAPI.getTasks(todolistId)
        dispatch(setTasksAC({tasks: data.items, todolistId}))
    } catch (error) {
        dispatch(setAppErrorMessage({
            errorMessage: `${error}`
        }))
    }
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    dispatch(setAppProgressStatus({status: 'loading'}))
    try {
        const data = await todolistsAPI.createTask(todolistId, title)
        if (data.resultCode === 0) {
            dispatch(addTaskAC({task: data.data.item}))
            dispatch(setAppProgressStatus({status: 'succeeded'}))
        } else {
            handleAppServerError(data, dispatch)
        }
    } catch (error) {
        handleNetworkServerError({message: `${error}`}, dispatch)
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => async (dispatch) => {
    try {
        await todolistsAPI.deleteTask(todolistId, taskId)
        dispatch(removeTaskAC({id: taskId, toDoListId: todolistId}))
    } catch (error) {
        dispatch(setAppErrorMessage({errorMessage: `${error}`}))
    }
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainModelTaskType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(task => task.id === taskId)
        if (!task) {
            console.warn(`task not found`)
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        try {
            const data = await todolistsAPI.updateTask(todolistId, taskId, apiModel)
            if (data.resultCode === 0) {
                dispatch(updateTaskAC({taskId, model: apiModel, toDoListId: todolistId}))
            } else {
                handleAppServerError(data, dispatch)
            }
        } catch (error) {
            dispatch(setAppErrorMessage({errorMessage: `${error}`}))
        }
    }

//types
export type TasksActionType =
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addNewTodolistAC>
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof setTodolistsAC>
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateDomainModelTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

