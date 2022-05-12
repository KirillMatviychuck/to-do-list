import React, {useCallback} from "react";
import classNew from './Todolist.module.css'
import {FilterTypes} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@material-ui/core";
import {Button} from "@mui/material";
import {Task} from "./Task";


export type ToDoListTypes = {
    id: string
    text: string
    isDone: boolean
}

type PropsTypes = {
    id: string
    toDoListData: Array<ToDoListTypes>
    title: string
    changeFilter: (value: FilterTypes, toDoList: string) => void
    addTask: (text: string, toDoListId: string) => void
    changeStatusTask: (taskId: string, isDone: boolean, toDoListId: string) => void
    removeTask: (taskId: string, toDoListId: string) => void
    changeSpanTextHandler: (taskId: string, newValue: string, toDoListId: string) => void
    removeToDoList: (toDoListId: string) => void
    changeToDoListTitle: (id: string, newTitle: string) => void
    filter: FilterTypes
}

const Todolist = React.memo((props: PropsTypes) => {
    const onAllFilterHandler = () => props.changeFilter('all', props.id)
    const onActiveFilterHandler = () => props.changeFilter('active', props.id)
    const onCompletedFilterHandler = () => props.changeFilter('completed', props.id)
    const removeToDoListHandler = () => props.removeToDoList(props.id)
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const changeToDoListTitle = useCallback((title: string) => {
        console.log('Todolist')
        props.changeToDoListTitle(props.id, title)
    }, [props.changeToDoListTitle, props.id])

    let tasksForToDoList = props.toDoListData
    if (props.filter === 'completed') {
        tasksForToDoList = props.toDoListData.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        tasksForToDoList = props.toDoListData.filter(t => !t.isDone)
    }
    return (
        <div className={"toDoList"}>
            <div className={classNew.titleSpan}><EditableSpan text={props.title} changeSpanText={changeToDoListTitle}/>
                <IconButton onClick={removeToDoListHandler}>
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm addTodolist={addTask}/>
            <div>
                <div className="list">
                    {props.toDoListData.map(t => <Task
                        task={t}
                        removeTask={props.removeTask}
                        todolistId={props.id}
                        changeStatusTask={props.changeStatusTask}
                        changeSpanTextHandler={props.changeSpanTextHandler}
                        key={t.id}/>

                    )}
                </div>
            </div>
            <div className="filter">
                <Button color="primary" variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllFilterHandler}> All
                </Button>
                <Button color="primary" variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveFilterHandler}> Active
                </Button>
                <Button color="primary" variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedFilterHandler}> Completed
                </Button>
            </div>
        </div>
    )
})

export default Todolist;



