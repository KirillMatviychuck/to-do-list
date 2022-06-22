export {}
// import React, {useReducer} from 'react';
// import './App.css';
// import Todolist from "./Todolist";
// import {v1} from "uuid";
// import {AddItemForm} from "./AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
// import {
//     addNewTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC, TodolistDomainType,
//     todolistReducer
// } from "./state/todolist-reducer";
// import tasksReducer, {addTaskAC, changeTaskStatusAC, changeTaskTextAC, removeTaskAC} from "./state/tasks-reducer";
// import {TodolistType} from "./api/todolists-api";
//
// export type FilterTypes = 'all' | 'completed' | 'active'
// export type ToDoListsType = {
//     id: string
//     title: string
//     filter: FilterTypes
// }
// export type TasksStateType = {
//     [key: string]: Array<TodolistType>
// }
//
// function App() {
//
//     let toDoListId1 = v1();
//     let toDoListId2 = v1();
//
//     let [toDoLists, dispatchToTodolistReducer] = useReducer<Array<TodolistDomainType>>(todolistReducer, [
//         {id: toDoListId1, title: 'What to learn', filter: 'all'},
//         {id: toDoListId2, title: 'What to buy', filter: 'all'}
//     ])
//
//     let [tasksObj, dispatchToTasksReducer] = useReducer<Array<TodolistDomainType>>(tasksReducer, {
//         [toDoListId1]: [
//             {id: v1(), text: "HTML&CSS", isDone: true},
//             {id: v1(), text: "JavaScript", isDone: true},
//             {id: v1(), text: "React", isDone: false},
//             {id: v1(), text: "Redux", isDone: false}
//         ],
//         [toDoListId2]: [
//             {id: v1(), text: 'Notebook', isDone: false},
//             {id: v1(), text: 'Cake', isDone: true},
//         ]
//     })
//
//     function changeTaskStatus(taskId: string, isDone: boolean, toDoListId: string) {
//         dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, toDoListId))
//     }
//
//     function changeTaskTitle(taskId: string, newValue: string, toDoListId: string) {
//         dispatchToTasksReducer(changeTaskTextAC(taskId, newValue, toDoListId))
//     }
//
//     function removeTask(id: string, toDoListId: string) {
//         dispatchToTasksReducer(removeTaskAC(id, toDoListId))
//     }
//
//     function addTask(text: string, toDoListId: string) {
//         dispatchToTasksReducer(addTaskAC(text, toDoListId))
//     }
//
//     function changeToDoListTitle(id: string, newTitle: string) {
//         dispatchToTodolistReducer(changeTodolistTitleAC(id, newTitle))
//     }
//
//     function changeFilter(value: FilterTypes, toDoListId: string) {
//        dispatchToTodolistReducer(changeTodolistFilterAC(value,toDoListId))
//     }
//
//     function addToDoList(title: string) {
//         const action = addNewTodolistAC(title)
//         dispatchToTodolistReducer(action);
//         dispatchToTasksReducer(action);
//     }
//
//     const removeToDoList = (toDoListId: string) => {
//         dispatchToTodolistReducer(removeTodolistAC(toDoListId))
//     }
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container>
//                     <AddItemForm addTodolist={addToDoList}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {toDoLists.map(t => {
//                         let tasksForToDoList = tasksObj[t.id];
//
//                         if (t.filter === 'completed') {
//                             tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
//                         }
//                         if (t.filter === 'active') {
//                             tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)
//                         }
//
//                         return <Grid item>
//                             <Paper style={{padding: "20px"}}>
//                                 <Todolist title={t.title}
//                                           key={t.id}
//                                           id={t.id}
//                                           toDoListData={tasksForToDoList}
//                                           removeTask={removeTask}
//                                           changeFilter={changeFilter}
//                                           addTask={addTask}
//                                           changeStatusTask={changeTaskStatus}
//                                           changeSpanTextHandler={changeTaskTitle}
//                                           changeToDoListTitle={changeToDoListTitle}
//                                           filter={t.filter}
//                                           removeToDoList={removeToDoList}/>
//                             </Paper>
//                         </Grid>
//                     })}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default App;
//
//
//
