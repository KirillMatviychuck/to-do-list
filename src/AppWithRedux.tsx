import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    deleteTodolistTC,
    fetchTodolistsTC,
    FilterTypes,
    TodolistDomainType,
} from "./state/todolist-reducer";
import {addTaskTC, deleteTaskTC, TasksStateType, updateTaskTC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TaskStatuses} from "./api/todolists-api";

function AppWithRedux() {
    console.log('App is called')
    const dispatch = useDispatch() as any
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    },[])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, toDoListId: string) => {
        dispatch(updateTaskTC(toDoListId, taskId, {status}))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newValue: string, toDoListId: string) =>{
        dispatch(updateTaskTC(toDoListId, taskId, {title: newValue}))
    }, [dispatch])

    const removeTask = useCallback((id: string, toDoListId: string) => {
        dispatch(deleteTaskTC(toDoListId, id))
    }, [dispatch])

    const addTask = useCallback((text: string, toDoListId: string) => {
        dispatch(addTaskTC(toDoListId, text))
    },[dispatch])

    const changeToDoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(id, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterTypes, toDoListId: string) => {
        dispatch(changeTodolistFilterAC(value,toDoListId))
    }, [dispatch])

    const addToDoList = useCallback((title: string) => {
        const action = createTodolistTC(title)
        dispatch(action);
    },[dispatch])

    const deleteTodolist = (toDoListId: string) => {
        dispatch(deleteTodolistTC(toDoListId))
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
                        let allTodolistTasks = tasks[t.id] ;
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
                                          removeToDoList={deleteTodolist}/>
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;



