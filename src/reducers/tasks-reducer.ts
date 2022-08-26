import {addNewTodolistAC, deleteTodolistAC, setTodolistsAC} from "./todolist-reducer";
import {TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {AppRootStateType} from "../store/store";
import {setAppProgressStatus} from "./app-reducer";
import {handleAppServerError, handleNetworkServerError} from "../utils/handleErrorUtils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const tasksInitialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, {rejectWithValue}) => {
    try {
        const data = await todolistsAPI.getTasks(todolistId)
        return {tasks: data.items, todolistId}
    } catch (error) {
        return rejectWithValue({errorMessage: `${error}`})
    }
})
export const deleteTaskTC = createAsyncThunk('tasks/deleteTask', async (param: { todoListId: string, id: string }, {
    rejectWithValue
}) => {
    try {
        await todolistsAPI.deleteTask(param.todoListId, param.id)
        return {id: param.id, todoListId: param.todoListId}
    } catch (error) {
        return rejectWithValue({errorMessage: `${error}`})
    }
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { todoListId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppProgressStatus({status: 'loading'}))
    try {
        const data = await todolistsAPI.createTask(param.todoListId, param.title)
        if (data.resultCode === 0) {
            dispatch(setAppProgressStatus({status: 'succeeded'}))
            return {task: data.data.item}
        } else {
            handleAppServerError(data, dispatch)
            return rejectWithValue({errorMessage: 'something went wrong'})
        }
    } catch (error) {
        handleNetworkServerError({message: `${error}`}, dispatch)
        return rejectWithValue(({message: `${error}`}))
    }
})
export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (
    param: { todoListId: string, taskId: string, domainModel: UpdateDomainModelTaskType },
    {dispatch, rejectWithValue, getState}
) => {
    const state = getState() as AppRootStateType
    const task = state.tasks[param.todoListId].find(task => task.id === param.taskId)
    if (!task) {
        console.warn(`task not found`)
        return rejectWithValue('task not found')
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...param.domainModel
    }
    try {
        const data = await todolistsAPI.updateTask(param.todoListId, param.taskId, apiModel)
        if (data.resultCode === 0) {
            return param
        } else {
            handleAppServerError(data, dispatch)
            return rejectWithValue('something went wrong')
        }
    } catch (error) {
        return rejectWithValue({errorMessage: `${error}`})
    }
})

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: tasksInitialState,
    reducers: {},
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
            .addCase(fetchTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(deleteTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoListId]
                const index = tasks.findIndex(t => t.id === action.payload.id)
                tasks.splice(index, 1)
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoListId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }
            })
    }
})

export const tasksReducer = tasksSlice.reducer

//types
export type TasksActionType =
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

