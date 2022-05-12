import React, {ChangeEvent, useState} from "react";
import classNew from './EditableSpan.module.css'

type EditableSpanPropsType = {
    text: string
    changeSpanText: (newValue: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')
    let [editMode, setEditMode] = useState(false)
    let [text, setText] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setText(props.text)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.changeSpanText(text)
    }

    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)

    return editMode ?
        <input value={text} onBlur={activateViewMode} onChange={onChangeTextHandler} autoFocus/> :
        <span onDoubleClick={activateEditMode} className={classNew.editableSpan}>{props.text}</span>
})

export default EditableSpan