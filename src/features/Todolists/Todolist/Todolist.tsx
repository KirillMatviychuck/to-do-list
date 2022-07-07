import React, {useCallback, useEffect} from "react";
import classNew from './Todolist.module.css'
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@material-ui/core";
import {Button} from "@mui/material";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterTypes, TodolistDomainType} from "../../../reducers/todolist-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../../../reducers/tasks-reducer";


type PropsTypes = {
    toDoListData: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterTypes, toDoList: string) => void
    addTask: (text: string, toDoListId: string) => void
    changeStatusTask: (taskId: string, status: TaskStatuses, toDoListId: string) => void
    removeTask: (taskId: string, toDoListId: string) => void
    changeSpanTextHandler: (taskId: string, newValue: string, toDoListId: string) => void
    removeToDoList: (toDoListId: string) => void
    changeToDoListTitle: (id: string, newTitle: string) => void
}

const Todolist = React.memo((props: PropsTypes) => {
    const onAllFilterHandler = () => props.changeFilter('all', props.toDoListData.id)
    const onActiveFilterHandler = () => props.changeFilter('active', props.toDoListData.id)
    const onCompletedFilterHandler = () => props.changeFilter('completed', props.toDoListData.id)
    const removeToDoListHandler = () => props.removeToDoList(props.toDoListData.id)
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.toDoListData.id)
    }, [props.addTask, props.toDoListData.id])
    const changeToDoListTitle = useCallback((title: string) => {
        console.log('Todolist')
        props.changeToDoListTitle(props.toDoListData.id, title)
    }, [props.changeToDoListTitle, props.toDoListData.id])

    let tasksForToDoList = props.tasks
    if (props.toDoListData.filter === 'completed') {
        tasksForToDoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.toDoListData.filter === 'active') {
        tasksForToDoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    const dispatch = useDispatch() as any
    useEffect(() => {
        dispatch(fetchTasksTC(props.toDoListData.id))
    }, [])
    return (
        <div className={"toDoList"}>
            <div className={classNew.titleSpan}><EditableSpan text={props.toDoListData.title} changeSpanText={changeToDoListTitle}/>
                <IconButton onClick={removeToDoListHandler} disabled={props.toDoListData.todolistStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm addTodolist={addTask}/>
            <div>
                <div className="list">
                    {props.tasks.map(t => <Task
                        task={t}
                        removeTask={props.removeTask}
                        todolistId={props.toDoListData.id}
                        changeStatusTask={props.changeStatusTask}
                        changeSpanTextHandler={props.changeSpanTextHandler}
                        key={t.id}/>

                    )}
                </div>
            </div>
            <div className="filter">
                <Button color="primary" variant={props.toDoListData.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllFilterHandler}> All
                </Button>
                <Button color="primary" variant={props.toDoListData.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveFilterHandler}> Active
                </Button>
                <Button color="primary" variant={props.toDoListData.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedFilterHandler}> Completed
                </Button>
            </div>
        </div>
    )
})

export default Todolist;



