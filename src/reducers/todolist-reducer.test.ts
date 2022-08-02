import {v1} from "uuid";
import {
    addNewTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, deleteTodolistAC, TodolistDomainType, todolistReducer,

} from "./todolist-reducer";


const toDoListId1 = v1()
const toDoListId2 = v1()
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    startState = [
        {id: toDoListId1, title: 'What to learn', filter: 'all', todolistStatus: 'idle', addedDate: '', order: 0},
        {id: toDoListId2, title: 'What to buy', filter: 'all', todolistStatus: 'idle', addedDate: '', order: 0},
    ]
})

test('remove correct todolist', () => {
    const correctTodolist = todolistReducer(startState, deleteTodolistAC({todolistId: toDoListId1}))

    expect(correctTodolist[0].id).toBe(toDoListId2)
    expect(startState.length).toBe(2)
    expect(correctTodolist.length).toBe(1)
})

test('add new todolist', () => {
    const newTodolist = {
        id: v1(),
        addedDate: '',
        order: 0,
        title: 'Plans for week'
    }

    const correctTodolist = todolistReducer(startState, addNewTodolistAC({todolist: newTodolist}))

    expect(correctTodolist[0].title).toBe('Plans for week')
    expect(startState.length).toBe(2)
    expect(correctTodolist.length).toBe(3)
})

test('change todolist title', () => {
    const newTodolistTitle = 'Sports per week'
    const correctTodolist = todolistReducer(startState, changeTodolistTitleAC({id: toDoListId2,newTitle: newTodolistTitle}))

    expect(correctTodolist[1].title).toBe(newTodolistTitle)
})

test('change filter for todolist', () => {
    const newFilterForTodolist = 'completed'
    const correctTodolist = todolistReducer(startState, changeTodolistFilterAC({value: newFilterForTodolist, toDoListId: toDoListId2}))

    expect(correctTodolist[1].filter).toBe(newFilterForTodolist)
})