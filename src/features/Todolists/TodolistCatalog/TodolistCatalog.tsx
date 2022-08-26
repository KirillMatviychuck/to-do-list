import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    deleteTodolistTC,
    fetchTodolistsTC,
    FilterTypes
} from "../../../reducers/todolist-reducer";
import {addTaskTC, deleteTaskTC, updateTaskTC} from "../../../reducers/tasks-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../../api/todolists-api";
import {Container, Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import Todolist from "../Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";

const TodolistsCatalog = () => {
    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        } else {
            dispatch(fetchTodolistsTC())
        }
    }, [isLoggedIn,dispatch])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, toDoListId: string) => {
        dispatch(updateTaskTC({todoListId: toDoListId, taskId, domainModel: {status}}))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newValue: string, toDoListId: string) => {
        dispatch(updateTaskTC({todoListId: toDoListId, taskId, domainModel: {title: newValue}}))
    }, [dispatch])

    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(deleteTaskTC({todoListId, id}))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskTC({todoListId, title}))
    }, [dispatch])

    const changeToDoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(id, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterTypes, toDoListId: string) => {
        dispatch(changeTodolistFilterAC({value, toDoListId}))
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