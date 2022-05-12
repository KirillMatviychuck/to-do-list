import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {v1} from "uuid";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {ToDoListTypes} from "./Todolist";

type TaskTypeProps = {
    changeStatusTask: (taskId: string, isDone: boolean, toDoListId: string) => void
    removeTask: (taskId: string, toDoListId: string) => void
    changeSpanTextHandler: (taskId: string, newValue: string, toDoListId: string) => void
    task: ToDoListTypes
    todolistId: string
}
export const Task = React.memo((props: TaskTypeProps) => {
    const removeHandler = () => props.removeTask(props.task.id, props.todolistId)
    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatusTask(props.task.id, e.currentTarget.checked, props.todolistId)
        }, [props.task.id, props.todolistId, props.changeStatusTask]
    )

    const changeSpanTextHandler = (newValue: string) => props.changeSpanTextHandler(props.task.id, newValue, props.todolistId)
    return (
        <div>
            <div className={props.task.isDone ? 'isDone' : ''}
                 key={props.task.id}>

                <Checkbox
                    color={'primary'}
                    checked={props.task.isDone}
                    onChange={changeStatusHandler}/>

                <EditableSpan key={v1()} text={props.task.text} changeSpanText={changeSpanTextHandler}/>

                <IconButton onClick={removeHandler}> <HighlightOffIcon/></IconButton>
            </div>
        </div>
    )
})