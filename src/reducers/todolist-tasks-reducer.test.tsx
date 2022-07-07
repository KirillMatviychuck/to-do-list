export {}
// import {TasksStateType, ToDoListsType} from "../App";
// import {addNewTodolistAC, todolistReducer} from "./todolist-reducer";
// import tasksReducer from "./tasks-reducer";
//
// test('ids should be equal', () => {
//
//     const startTaskState: TasksStateType = {}
//     const startTodolistsState: ToDoListsType[] = []
//
//     const action = addNewTodolistAC("title is no matter")
//
//     const endTasksState = tasksReducer(startTaskState, action)
//     const endTodolistsState = todolistReducer(startTodolistsState, action)
//
//     const keys = Object.keys(endTasksState)
//     const idFromTasks = keys[0]
//     const idFromTodolists = endTodolistsState[0].id
//
//     expect(idFromTasks).toBe(action.todolistId)
//     expect(idFromTodolists).toBe(action.todolistId)
// })