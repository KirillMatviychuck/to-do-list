import React, {useCallback} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addNewTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistsStateType
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTextAC, removeTaskAC, TasksStateType} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

export type FilterTypes = 'all' | 'completed' | 'active'


function AppWithRedux() {
    console.log('App is called')
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistsStateType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, toDoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, toDoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newValue: string, toDoListId: string) =>{
        dispatch(changeTaskTextAC(taskId, newValue, toDoListId))
    }, [dispatch])

    const removeTask = useCallback((id: string, toDoListId: string) => {
        dispatch(removeTaskAC(id, toDoListId))
    }, [dispatch])

    const addTask = useCallback((text: string, toDoListId: string) => {
        dispatch(addTaskAC(text, toDoListId))
    },[dispatch])

    const changeToDoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterTypes, toDoListId: string) => {
        dispatch(changeTodolistFilterAC(value,toDoListId))
    }, [dispatch])

    const addToDoList = useCallback((title: string) => {
        const action = addNewTodolistAC(title)
        dispatch(action);
    },[dispatch])

    const removeToDoList = (toDoListId: string) => {
        dispatch(removeTodolistAC(toDoListId))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{margin: "15px"}}>
                    <AddItemForm addTodolist={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(t => {
                        let allTodolistTasks = tasks[t.id];
                        let tasksForToDoList = allTodolistTasks

                        return <Grid item>
                            <Paper style={{margin: "10px", padding: "20px"}}>
                                <Todolist title={t.title}
                                          key={t.id}
                                          id={t.id}
                                          toDoListData={tasksForToDoList}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeStatusTask={changeTaskStatus}
                                          changeSpanTextHandler={changeTaskTitle}
                                          changeToDoListTitle={changeToDoListTitle}
                                          filter={t.filter}
                                          removeToDoList={removeToDoList}/>
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;



