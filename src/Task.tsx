import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {v1} from "uuid";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {TaskStatuses, TaskType} from "./api/todolists-api";

type TaskTypeProps = {
    changeStatusTask: (taskId: string, status: TaskStatuses, toDoListId: string) => void
    removeTask: (taskId: string, toDoListId: string) => void
    changeSpanTextHandler: (taskId: string, newValue: string, toDoListId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskTypeProps) => {
    const removeHandler = () => props.removeTask(props.task.id, props.todolistId)
    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatusTask(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
        }, [props.task.id, props.todolistId, props.changeStatusTask]
    )

    const changeSpanTextHandler = (newValue: string) => props.changeSpanTextHandler(props.task.id, newValue, props.todolistId)
    return (
        <div>
            <div className={props.task.status === TaskStatuses.Completed ? 'isDone' : ''}
                 key={props.task.id}>

                <Checkbox
                    color={'primary'}
                    checked={props.task.status === TaskStatuses.Completed}
                    onChange={changeStatusHandler}/>

                <EditableSpan key={v1()} text={props.task.title} changeSpanText={changeSpanTextHandler}/>

                <IconButton onClick={removeHandler}> <HighlightOffIcon/></IconButton>
            </div>
        </div>
    )
})