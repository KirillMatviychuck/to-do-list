import {addNewTodolistAC, TodolistDomainType, todolistReducer} from "./todolist-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";

test('id should be equal', () => {

    const startTaskState: TasksStateType = {}
    const startTodolistsState: TodolistDomainType[] = []

    const newTodolist = {
        id: 'toDoListId3',
        addedDate: '',
        order: 0,
        title: 'title is no matter'
    }

    const finalTasksState = tasksReducer(startTaskState, addNewTodolistAC({todolist: newTodolist}))
    const finalTodolistsState = todolistReducer(startTodolistsState, addNewTodolistAC({todolist: newTodolist}))

    const keys = Object.keys(finalTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = finalTodolistsState[0].id

    expect(idFromTasks).toBe(newTodolist.id)
    expect(idFromTodolists).toBe(newTodolist.id)
})