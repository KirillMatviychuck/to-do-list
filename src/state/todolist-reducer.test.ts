import {v1} from "uuid";
import {ToDoListsType} from "../App";
import {
    addNewTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterTodolistType,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";

test('remove correct todolist', () => {
    let toDoListId1 = v1();
    let toDoListId2 = v1();

    const startState: ToDoListsType[] = [
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to buy', filter: 'all'}
    ]

    const correctTodolist = todolistReducer(startState,removeTodolistAC(toDoListId1))

    expect(correctTodolist[0].id).toBe(toDoListId2)
    expect(startState.length).toBe(2)
    expect(correctTodolist.length).toBe(1)
})

test('add new todolist', () => {
    let toDoListId1 = v1();
    let toDoListId2 = v1();

    const newTodolistTitle = 'Plans for week'

    const startState: ToDoListsType[] = [
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to buy', filter: 'all'}
    ]

    const correctTodolist = todolistReducer(startState, addNewTodolistAC(newTodolistTitle))

    expect(correctTodolist[0].title).toBe(newTodolistTitle)
    expect(startState.length).toBe(2)
    expect(correctTodolist.length).toBe(3)
})

test('change todolist title', () => {
    let toDoListId1 = v1();
    let toDoListId2 = v1();

    const newTodolistTitle = 'Sports per week'
    const startState: ToDoListsType[] = [
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to buy', filter: 'all'}
    ]

    const correctTodolist = todolistReducer(startState, changeTodolistTitleAC(toDoListId2, newTodolistTitle))

    expect(correctTodolist[1].title).toBe(newTodolistTitle)
    expect(startState.length).toBe(2)
    expect(correctTodolist.length).toBe(2)
})

test('change filter for todolist', () => {
    let toDoListId1 = v1();
    let toDoListId2 = v1();

    const newFilterForTodolist = 'completed'
    const startState: ToDoListsType[] = [
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to buy', filter: 'all'}
    ]

    const correctTodolist = todolistReducer(startState, changeTodolistFilterAC(newFilterForTodolist, toDoListId2))

    expect(correctTodolist[1].filter).toBe(newFilterForTodolist)
    expect(startState.length).toBe(2)
    expect(correctTodolist.length).toBe(2)
})