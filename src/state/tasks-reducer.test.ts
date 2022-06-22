export {}
// import {} from "../App";
// import tasksReducer, {addTaskAC, changeTaskStatusAC, changeTaskTextAC, removeTaskAC} from "./tasks-reducer";
// import {addNewTodolistAC, removeTodolistAC} from "./todolist-reducer";
// import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";
//
// test('change task status', () => {
//     // export type TaskType = {
//     //     description: string
//     //     title: string
//     //     status: TaskStatuses
//     //     priority: TaskPriorities
//     //     startDate: string
//     //     deadline: string
//     //     id: string
//     //     todoListId: string
//     //     order: number
//     //     addedDate: string
//     // }
//
//     const startTasks: TaskType = {
//         "toDoListId1": [
//             {id: '1', text: "HTML&CSS", status: TaskStatuses.Completed, },
//             {id: '2', text: "JavaScript", isDone: TaskStatuses.Completed},
//             {id: '3', text: "React", isDone: TaskStatuses.New},
//             {id: '4', text: "Redux", isDone: TaskStatuses.New}
//         ],
//         "toDoListId2": [
//             {id: '1', text: 'Notebook', isDone: TaskStatuses.New},
//             {id: '2', text: 'Cake', isDone: TaskStatuses.Completed},
//         ]
//     }
//
//     const action = changeTaskStatusAC('1', false , "toDoListId1")
//     const finalTasks = tasksReducer(startTasks, action)
//
//     expect(finalTasks["toDoListId1"][0].isDone).toBeFalsy()
// })
//
// test('remove task', () => {
//     const startTasks: TasksStateType = {
//         "toDoListId1": [
//             {id: '1', text: "HTML&CSS", isDone: true},
//             {id: '2', text: "JavaScript", isDone: true},
//             {id: '3', text: "React", isDone: false},
//             {id: '4', text: "Redux", isDone: false}
//         ],
//         "toDoListId2": [
//             {id: '1', text: 'Notebook', isDone: false},
//             {id: '2', text: 'Cake', isDone: true},
//         ]
//     }
//
//     const action = removeTaskAC("toDoListId2", '1')
//     const finalTasks = tasksReducer(startTasks, action)
//
//     expect(finalTasks["toDoListId1"].length).toBe(4)
//     expect(finalTasks["toDoListId2"].length).toBe(1)
//     expect(startTasks["toDoListId2"].length).toBe(2)
// })
//
// test('add new task', () => {
//
//     const startTasks: TasksStateType = {
//         "toDoListId1": [
//             {id: '1', text: "HTML&CSS", isDone: true},
//             {id: '2', text: "JavaScript", isDone: true},
//             {id: '3', text: "React", isDone: false},
//             {id: '4', text: "Redux", isDone: false}
//         ],
//         "toDoListId2": [
//             {id: '1', text: 'Notebook', isDone: false},
//             {id: '2', text: 'Cake', isDone: true},
//         ]
//     }
//
//     const action = addTaskAC("toDoListId2", 'Chocolate')
//     const finalTasks = tasksReducer(startTasks, action)
//
//     expect(finalTasks["toDoListId1"].length).toBe(4)
//     expect(finalTasks["toDoListId2"].length).toBe(3)
//     expect(finalTasks["toDoListId2"][2].text).toBe('Chocolate')
//     expect(startTasks["toDoListId2"].length).toBe(2)
// })
//
// test('change task text', () => {
//
//     const startTasks: TasksStateType = {
//         "toDoListId1": [
//             {id: '1', text: "HTML&CSS", isDone: true},
//             {id: '2', text: "JavaScript", isDone: true},
//             {id: '3', text: "React", isDone: false},
//             {id: '4', text: "Redux", isDone: false}
//         ],
//         "toDoListId2": [
//             {id: '1', text: 'Notebook', isDone: false},
//             {id: '2', text: 'Cake', isDone: true},
//         ]
//     }
//
//     const action = changeTaskTextAC("toDoListId2", '2', 'Milk')
//     const finalTasks = tasksReducer(startTasks, action)
//
//     expect(finalTasks["toDoListId1"].length).toBe(4)
//     expect(finalTasks["toDoListId2"].length).toBe(2)
//     expect(finalTasks["toDoListId2"][1].text).toBe('Milk')
//     expect(startTasks["toDoListId2"].length).toBe(2)
// })
//
// test('new property with new array should be added when new todolist is added', () => {
//
//     const startTasks: TasksStateType = {
//         "toDoListId1": [
//             {id: '1', text: "HTML&CSS", isDone: true},
//             {id: '2', text: "JavaScript", isDone: true},
//             {id: '3', text: "React", isDone: false},
//             {id: '4', text: "Redux", isDone: false}
//         ],
//         "toDoListId2": [
//             {id: '1', text: 'Notebook', isDone: false},
//             {id: '2', text: 'Cake', isDone: true},
//         ]
//     }
//
//     const action = addNewTodolistAC("title is no matter")
//     const finalTasks = tasksReducer(startTasks, action)
//
//     const keys = Object.keys(finalTasks)
//     const newKey = keys.find(k => k !== "toDoListId1" && k !== "toDoListId2")
//     if (!newKey) {
//         throw new Error("new key is not added")
//     }
//
//     expect(keys.length).toBe(3)
//     expect(finalTasks[newKey]).toEqual([])
// })
//
// test('property with todolistId should be deleted', () => {
//
//     const startTasks: TasksStateType = {
//         "toDoListId1": [
//             {id: '1', text: "HTML&CSS", isDone: true},
//             {id: '2', text: "JavaScript", isDone: true},
//             {id: '3', text: "React", isDone: false},
//             {id: '4', text: "Redux", isDone: false}
//         ],
//         "toDoListId2": [
//             {id: '1', text: 'Notebook', isDone: false},
//             {id: '2', text: 'Cake', isDone: true},
//         ]
//     }
//
//     const action = removeTodolistAC('toDoListId2')
//     const finalTasks = tasksReducer(startTasks, action)
//
//     const keys = Object.keys(finalTasks)
//
//
//     expect(keys.length).toBe(1)
//     expect(finalTasks['toDoListId2']).toBeUndefined()
// })