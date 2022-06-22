import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "d06f67aa-6a53-4862-8b03-b54db62d6ffb"
    }
})
const idToChange = '7c038190-f00e-4dde-8947-86e565e551d8'

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Medium = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
type UpdateTaskRequestType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

const payloadForTask = {
    title: 'I changed title of the old task',
    description: '',
    status: 0,
    priority: 0,
    startDate: '',
    deadline: ''
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
            .then(res => res.data)
    },
    createTodolist() {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists',{title: 'Another one'})
            .then(res => res.data)
    },
    deleteTodolist() {
        return instance.delete<ResponseType>(`todo-lists/${idToChange}`)
            .then(res => res.data)

    },
    updateTodolist() {
        return instance.put<ResponseType>(`todo-lists/${idToChange}`,{title: 'I changed this title'})
            .then(res => res.data)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
            .then(res => {
                debugger
                return res.data
            })
    },
    createTask(todolistId: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists/${todolistId}/tasks`, {title: 'Here is a new Task'})
            .then(res => res.data)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    },
    updateTask(todolistId: string, taskId: string) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, payloadForTask)
            .then(res => {
                debugger
                return res.data
            })
    }
}