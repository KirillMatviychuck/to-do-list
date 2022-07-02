import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/store";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    deleteTodolistTC,
    fetchTodolistsTC,
    FilterTypes,
    TodolistDomainType
} from "../../../state/todolist-reducer";
import {addTaskTC, deleteTaskTC, TasksStateType, updateTaskTC} from "../../../state/tasks-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../../api/todolists-api";
import {Container, Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import Todolist from "../Todolist/Todolist";
import { Navigate } from "react-router-dom";

const TodolistsCatalog = () => {
    const dispatch = useDispatch() as any
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if(!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, toDoListId: string) => {
        dispatch(updateTaskTC(toDoListId, taskId, {status}))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newValue: string, toDoListId: string) => {
        dispatch(updateTaskTC(toDoListId, taskId, {title: newValue}))
    }, [dispatch])

    const removeTask = useCallback((id: string, toDoListId: string) => {
        dispatch(deleteTaskTC(toDoListId, id))
    }, [dispatch])

    const addTask = useCallback((text: string, toDoListId: string) => {
        dispatch(addTaskTC(toDoListId, text))
    }, [dispatch])

    const changeToDoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(id, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterTypes, toDoListId: string) => {
        dispatch(changeTodolistFilterAC(value, toDoListId))
    }, [dispatch])

    const addToDoList = useCallback((title: string) => {
        const action = createTodolistTC(title)
        dispatch(action);
    }, [dispatch])

    const deleteTodolist = (toDoListId: string) => {
        dispatch(deleteTodolistTC(toDoListId))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
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
                                <Todolist key={t.id}
                                          toDoListData={t}
                                          tasks={tasksForToDoList}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeStatusTask={changeTaskStatus}
                                          changeSpanTextHandler={changeTaskTitle}
                                          changeToDoListTitle={changeToDoListTitle}
                                          removeToDoList={deleteTodolist}/>
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </>
    )
}

export {TodolistsCatalog}